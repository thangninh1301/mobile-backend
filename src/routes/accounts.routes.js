const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accounts.controllers");
const loginToken = require("../middlewares/loginToken.middlewares")
router.post("/register",
    accountController.register);
router.post("/login",
    accountController.login);
router.put("/password",
    loginToken.verify,
    accountController.changePassword);
router.put("/contact",
    loginToken.verify,
    accountController.updateContact);
router.get("/contact",
    loginToken.verify,
    accountController.getUserContact);
module.exports=router;