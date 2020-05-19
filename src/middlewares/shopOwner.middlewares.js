const jwt = require("jsonwebtoken");
const secretKey = require("config").get("SECRET_KEY");
const productModels = require("../models/products.models");
async function shopOwnerVerify(req, res, next) {
    const {id} = req.tokenData;

    const {product_id} = req.body;
    if (!product_id)
        throw new Error("missing");
    let [products] = await productModels.getProductbyId(product_id);
    products = products[0];

    if (products.shop_owner_id!==id) {
        return res.status(403).json({
            success: false,
            reason: "you haven't permission"
        });
    } else{
        next();
    }


}

module.exports = {
    shopOwnerVerify
};
