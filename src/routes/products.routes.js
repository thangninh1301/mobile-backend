const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/create",
    loginToken.verify,
    productController.createProduct);
router.get("/productlines",
    productController.getProductLines);
module.exports=router;