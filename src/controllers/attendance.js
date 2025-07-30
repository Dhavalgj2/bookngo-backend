const Attendance = require("../models/Attendance");

exports.postAttendance = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      mobile,
      address,
      adults,
      child5to12,
      childbelow5,
    } = req.body;
    const attendance = new Attendance({
      firstName,
      lastName,
      mobile,
      address,
      adults,
      child5to12,
      childbelow5,
    });
    await attendance.save();
    res.status(200).json({ message: "Attendance received!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
