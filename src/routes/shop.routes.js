const express = require("express");
const router = express.Router();
const shopControllers = require("../controllers/shop.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/register",
    loginToken,
    shopControllers.register);
router.put("/",
    loginToken.verify,
    shopControllers.update);
router.get("/",
    loginToken.verify,
    shopControllers.getOwnerShopInfo);
module.exports=router;