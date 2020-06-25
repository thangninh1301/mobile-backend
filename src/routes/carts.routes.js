const express = require("express");
const router = express.Router();
const cartsControllers = require("../controllers/carts.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/create",
    loginToken.verify,
    cartsControllers.create);
router.get("/",
    loginToken.verify,
    cartsControllers.getCarts);
router.delete("/",
    loginToken.verify,
    cartsControllers.del);
module.exports=router;