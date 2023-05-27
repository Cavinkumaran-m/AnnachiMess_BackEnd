const express = require("express");
const router = express.Router();
const CustomerController = require("../Controllers/CustomerController");

router.get("/show", CustomerController.show);
router.post("/register", CustomerController.register);
router.post("/login", CustomerController.login);
router.get("/login", CustomerController.login2);
router.get("/session", CustomerController.session);
router.get("/logout", CustomerController.logout);
router.get("/getData", CustomerController.getData);
router.post("/updateOrder", CustomerController.updateOrder);
module.exports = router;
