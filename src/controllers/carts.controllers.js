const bcrypt = require("bcrypt");
const config = require("config");
const jwt = require("jsonwebtoken");

const productModels = require("../models/products.models");
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
        [rows]= await models.getCarts(id)

        // for (i = 0; i < rows.length; i++) {
        //     let [existedProductDetail] = await productModels.getProductDetailByProductDetailId(rows[i].productdetail_id);
        //     existedProductDetail=existedProductDetail[0]
        //     rows[i].price=existedProductDetail.price;
        //     rows[i].saleprice=existedProductDetail.saleprice;
        //     rows[i].saleprice=existedProductDetail.saleprice;
        // }


        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function del(req, res) {
    const {
        cart_id
    } = req.query;
    const {id}=req.tokenData;
    try {
        if (!cart_id)
            throw new Error("missing field cart_id");
        let [existedCart] = await models.getCartById(cart_id);
        if (!existedCart.length)
            throw new Error("cart  not exist");
        existedCart=existedCart[0];

        if (id !== existedCart.user_id)
            throw new Error("you are not owner");

        await models.del(cart_id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports={
    create,
    getCarts,
    del
}