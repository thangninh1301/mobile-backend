const express = require("express");
const router = express.Router();
const shopControllers = require("../controllers/shop.controllers");
const loginToken = require("../middlewares/loginToken.middlewares");
router.post("/create",
    loginToken.verify,
    shopControllers.create);
router.put("/",
    loginToken.verify,
    shopControllers.update);
router.get("/",
    loginToken.verify,
    shopControllers.getOwnerShopInfo);
module.exports=router;