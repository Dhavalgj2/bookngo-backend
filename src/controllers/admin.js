const Attendance = require("../models/Attendance");

exports.totalRegistration = async (req, res) => {
  try {
    const registrations = await Attendance.find().sort({ createdAt: -1 });
    res.json(registrations);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch registrations" });
  }
};
