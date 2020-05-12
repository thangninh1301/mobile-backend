const jwt = require("jsonwebtoken");

const productModels = require("../models/products.models");
const responseUtil = require("../utils/response.utils");

async function createProduct(req, res) {
    const {
        productline_id,
        description,
        name
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");
        if (description.length < 8)
            throw new Error("description greater than 8 characters");

        await productModels.createProduct(name,id,productline_id,description);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductLines(req, res) {

    try {
        const [productLines] = await productModels.getProductlines();

        res.json(responseUtil.success({data: {productLines}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}








module.exports = {
    createProduct,
    getProductLines
}