const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const models = require("../models/carts.models");
const responseUtil = require("../utils/response.utils")


async function create(req, res) {
    const {
        productdetail_id,
        quality
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (!productdetail_id)
            throw new Error("missig");
        if (!quality)
            throw new Error("missig");
        const [existedCart] = await models.getCartExist(id,productdetail_id);
        if (existedCart.length){
            await models.update(existedCart[0].id,id,productdetail_id,quality+existedCart[0].quality)
        } else{
            await models.create(id,productdetail_id,quality)
        }


        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getCarts(req, res) {
    const {id}=req.tokenData;
    try {
        [rows]= await models.getCartExist(id)


        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports={
    create
}