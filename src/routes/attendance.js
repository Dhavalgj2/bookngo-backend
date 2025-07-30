const express = require("express");

const router = express.Router();

const attendanceController = require("../controllers/attendance");

router.post("/attendance", attendanceController.postAttendance);

module.exports = router;
