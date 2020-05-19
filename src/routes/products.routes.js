const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const loginToken = require("../middlewares/loginToken.middlewares");
const shopOwnerVeryfy = require("../middlewares/shopOwner.middlewares");
router.post("/create",
    loginToken.verify,
    productController.createProduct);
router.get("/productlines",
    productController.getProductLines);
router.get("/inShop",
    productController.getProductbyShopid);
router.get("/inMyShop",
    loginToken.verify,
    productController.getProductInMyshop);
router.post("/createProductDetail",
    loginToken.verify,
    shopOwnerVeryfy.shopOwnerVerify,
    productController.createProductDetails);
router.get("/detail",
    productController.getProductDetailByProductId);
module.exports=router;