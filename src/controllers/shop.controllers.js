const jwt = require("jsonwebtoken");

const shopModels = require("../models/shop.models");
const responseUtil = require("../utils/response.utils")

async function register(req, res) {
    const {
        name
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");

        const [existedShop] = await shopModels.getShopByName(name);
        if (existedShop.length)
            throw new Error("name is existed");

        const [existedShop2] = await shopModels.getShopByUserId(id);
        if (existedShop2.length)
            throw new Error("user can create only 1 shop");

        await shopModels.createShop(name,id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function update(req, res) {
    const {
        new_name,
        new_description
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");

        const [existedShop] = await shopModels.getShopByName(new_name);
        if (existedShop.length)
            throw new Error("name is existed");

        const [existedShop2] = await shopModels.getShopByUserId(id);
        if (!existedShop2.length)
            throw new Error("shop is not created");

        await shopModels.update(new_name,new_description);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getOwnerShopInfo(req, res) {
    const {id} = req.tokenData;
    try {
        let [shopInfo] = await shopModels.getShopByUserId(id);
        if (!shopInfo.length)
            throw new Error("not exist");

        shopInfo=shopInfo[0];

        res.json(responseUtil.success({data: {shopInfo}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}


module.exports = {
    register,
    update,
    getOwnerShopInfo

}