const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/orders.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/create",
    loginToken.verify,
    ordersControllers.create);
router.put("/byuser",
    loginToken.verify,
    ordersControllers.update);
router.get("/byuser",
    loginToken.verify,
    ordersControllers.getAllOrdersbyUser);
router.get("/orderdetail",
    loginToken.verify,
    ordersControllers.getOrderDetailbyOrderid);
router.get("/myshop",
    loginToken.verify,
    ordersControllers.getAllOrdersbymyShop);
router.put("/byshop",
    loginToken.verify,
    ordersControllers.updateStatusbyshop);



module.exports=router;