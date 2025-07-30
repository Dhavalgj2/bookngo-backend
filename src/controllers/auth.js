const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res) => {
  const { firstName, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hasedPassword = await bcrypt.hash(password, 10);

    const hasedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    const user = new User({
      firstName,
      email,
      password: hasedPassword,
      confirmPassword: hasedConfirmPassword,
    });
    await user.save();
    res.status(201).json({ message: "signup successfull" });
  } catch (error) {
    console.error("signup error", error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role || "user", // if you have roles
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token, // ⬅️ Send token to client
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((error) => {
    if (error) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
};

exports.checkAuth = (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      authenticated: true,
      email: req.session.user.email,
    });
  }
  return res.status(401).json({
    authenticated: false,
  });
};
