const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth");

const registrationController = require("../controllers/admin");

router.get(
  "/api/registration",
  authMiddleware,
  registrationController.totalRegistration
);

module.exports = router;
