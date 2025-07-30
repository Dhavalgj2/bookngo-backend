const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.post("/api/signup", authController.userSignup);

router.post("/api/login", authController.login);

router.post("/api/logout", authController.logout);

router.get("/api/check-auth", authController.checkAuth);

module.exports = router;
