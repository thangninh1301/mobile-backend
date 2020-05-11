const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const shop = require("../models/shop.models");
const responseUtil = require("../utils/response.utils")

async function register(req, res) {
    const {
        name
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");

        const [existedShop] = await shop.getShopByName(name);
        if (existedShop.length)
            throw new Error("name is existed");

        const [existedShop2] = await shop.getShopByUserId(id);
        if (existedShop2.length)
            throw new Error("user can create only 1 shop");

        await shop.createShop(name,id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    register

}