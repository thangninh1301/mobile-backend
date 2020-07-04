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




module.exports=router;