const express = require("express");
const router = express.Router();
const ordersControllers = require("../controllers/orders.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/create",
    loginToken.verify,
    ordersControllers.create);



module.exports=router;