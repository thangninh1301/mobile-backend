const jwt = require("jsonwebtoken");

const productModels = require("../models/products.models");
const responseUtil = require("../utils/response.utils");

async function createProduct(req, res) {
    const {
        productline_id,
        description,
        name,
        imgUrl
    } = req.body;
    const {id}=req.tokenData;
    try {
        if (name.length < 8)
            throw new Error("name must greater than 8 characters");
        if (description.length < 8)
            throw new Error("description greater than 8 characters");

        await productModels.createProduct(name,id,productline_id,description,imgUrl);

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

async function getProductbyShopid(req, res) {
    const {
        shopid
    } = req.query;
    try {
        if (!shopid)
            throw new Error("missing shopid");

        const [rows] = await productModels.getProductByOwnerId(shopid);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductInMyshop(req, res) {
    const {id}=req.tokenData;
    try {
        const [rows] = await productModels.getProductByOwnerId(id);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductDetailByProductId(req, res) {
    const {
        product_id
    } = req.query;
    try {
        const [rows] = await productModels.getProductDetailByProductId(product_id);

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function createProductDetails(req, res) {
    const {
        product_id,
        imgUrl,
        classification,
        stock,
        price,
        saleprice
    } = req.body;
    try {

        if (classification.length < 8)
            throw new Error("classification greater than 8 characters");
        if (!product_id)
            throw new Error("missing");
        if (!imgUrl)
            throw new Error("missing");
        if (!stock)
            throw new Error("missing");
        if (!price)
            throw new Error("cmissing");
        if (!saleprice)
            throw new Error("missing");
        await productModels.createProductDetail(product_id, imgUrl, classification, stock, price, saleprice);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function delProduct(req, res) {
    const {
        product_id
    } = req.query;
    const {id}=req.tokenData;
    try {
        if (!product_id)
            throw new Error("missing field product_id");
        let [existedProduct] = await productModels.getProductbyId(product_id);
        if (!existedProduct.length)
            throw new Error("product not exist");
        existedProduct=existedProduct[0];
        if (id !== existedProduct.shop_owner_id)
            throw new Error("you are not shop owner");

        await productModels.delProduct(product_id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}
async function delProductDetail(req, res) {
    const {
        product_detail_id
    } = req.query;
    const {id}=req.tokenData;
    try {
        if (!product_detail_id)
            throw new Error("missing field product_id");
        let [existedProductDetail] = await productModels.getProductDetailByProductDetailId(product_detail_id);
        if (!existedProductDetail.length)
            throw new Error("product detail not exist");
        existedProductDetail=existedProductDetail[0];

        let [existedProduct] = await productModels.getProductbyId(existedProductDetail.product_id);

        existedProduct=existedProduct[0];

        if (id !== existedProduct.shop_owner_id)
            throw new Error("you are not shop owner");

        await productModels.delProductDetail(product_detail_id);

        res.json(responseUtil.success({data: {}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getProductNew(req, res) {

    try {
        const [rows] = await productModels.getProductNew();

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

async function getAllProduct(req, res) {

    try {
        let [rows] = await productModels.getProduct();
        let temp=rows[0].id;
        let min=rows[0].saleprice;
        let max=rows[0].saleprice;
        let rowstemp=[rows.length-1]

        for (let i = 0; i < rows.length; i++){
            if (temp!==rows[i].id){
                temp=rows[i].id;
                rowstemp.push(i-1);
                rows[i-1].price='đ'+min+'-'+'đ'+max;
                min=rows[i].saleprice;
                max=rows[i].saleprice;
            }
            else{
                if (min>rows[i].saleprice) min =rows[i].saleprice;
                if (max<rows[i].saleprice) max = rows[i].saleprice;
            }
        }
        rows[rows.length-1].price='đ'+min+'-'+'đ'+max;


        let rows2=[]
        for (let i = 0; i < rowstemp.length; i++){
            rows2.push(rows[rowstemp[i]])
        }

        rows=rows2

        res.json(responseUtil.success({data: {rows}}));
    } catch (err) {
        res.json(responseUtil.fail({reason: err.message}));
    }
}

module.exports = {
    createProduct,
    getProductLines,
    getProductbyShopid,
    getProductInMyshop,
    createProductDetails,
    getProductDetailByProductId,
    delProduct,
    delProductDetail,
    getProductNew,
    getAllProduct
}