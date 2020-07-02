const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const randomize = require('randomatic');
const account = require("../models/accounts.models");
const responseUtil = require("../utils/response.utils")
const shopModels = require("../models/shop.models");

async function register(req, res) {
    const {
        username,
        password
    } = req.body;
    try {
        if (username.length < 8)
            throw new Error("Username must greater than 8 characters");
        if (password.length < 8)
            throw new Error("Password must greater than 8 characters");
        const [existedUser] = await account.getUserByUsername(username);
        if (existedUser.length)
            throw new Error("Username is existed");

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password,salt);

        await account.createUser(username,hashPassword);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
// async function changePassword(req, res) {
//     const {
//         username,
//         password
//     } = req.body;
//     console.log(req.body);
//     try {
//         if (username.length < 8)
//             throw new Error("Username must greater than 8 characters");
//         if (password.length < 8)
//             throw new Error("Password must greater than 8 characters");
//         const [existedUser] = await account.getUserByUsername(username);
//         if (existedUser.length)
//             throw new Error("Username is existed");
//
//         let salt = await bcrypt.genSalt(10);
//         let hashPassword = await bcrypt.hash(password,salt);
//
//         await account.createUser(username,hashPassword);
//
//         res.json(responseUtil.success({data: {}}));
//     } catch (err) {
//         res.json(responseUtil.fail({reason: err.message}));
//     }
// }
async function login(req, res) {
    const {
        username,
        password
    } = req.body;
    try {
        let [user] = await account.getUserByUsername(username);
        if (!user.length)
            throw new Error("User name or password is incorrect");
        user = user[0];
        const hashPassword = user.password;
        const checkPass = bcrypt.compareSync(password, hashPassword);

        if (!checkPass)
            throw new Error("User name or password is incorrect");

        const twentyFourHours = 24 * 60 * 60 * 100;

        const token = jwt.sign({
                id: user.id,
                username: user.username
            },
            config.get("SECRET_KEY"), {
                expiresIn: twentyFourHours
            }
        );
        const shopname=randomize('Aa0',12);
        const [existedShop2] = await shopModels.getShopByUserId(user.id);
        if (!existedShop2.length){
            await shopModels.createShop(shopname,user.id);
        }
        res.json(responseUtil.success({data: {token}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function updateContact(req, res){
    const  {
        fullname ,
        email,
        phone,
        avatarUrl
    } = req.body;
    const {id}=req.tokenData;
    try{

        let [user] = await account.getUserById(id);
        if (!user.length)
            throw new Error("User name is not exist");

        let [contact] = await account.getContactByUserid(id)
        if(!contact.length)
            await account.createContactRow(id);

        await account.updateContact(id,email,fullname,phone,avatarUrl);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}


async function changePassword(req, res) {
    const {
        username,
        old_password,
        new_password
    } = req.body;
    const {id} = req.tokenData;
    try {
        if (!old_password)
            throw new Error("Please enter your old password");
        // if (!username)
        //     throw new Error("Please enter your username");
        if (!new_password)
            throw new Error("Please enter your new password");
        if (new_password.length < 8)
            throw new Error("Password must greater than 8 characters");



        const [existedUser] = await account.getUserById(id);
        // if (existedUser[0].username !== username)
        //     throw new Error("wrong username");

        let salt = await bcrypt.genSalt(10);
        const validatePassword = await bcrypt.compare(old_password, existedUser[0].password);
        if (!validatePassword)
            throw new Error("Your old password is wrong");

        let hashPassword = await bcrypt.hash(new_password, salt);
        await account.updatePassword(id, hashPassword);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getUserContact(req, res) {
    const {id} = req.tokenData;
    try {
        let [user] = await account.getUserById(id);
        if (!user.length)
            throw new Error("User is not exist");

        let [contact] = await account.getContactByUserid(id);

        if(!contact.length){
            await account.createContactRow(id);
            let [contact] = await account.getContactByUserid(id)
            contact=contact[0];
            res.json(responseUtil.success({data: {contact}}));
        }

        contact=contact[0];


        res.json(responseUtil.success({data: {contact}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}





module.exports = {
    register,
    login,
    changePassword,
    updateContact,
    getUserContact
}
