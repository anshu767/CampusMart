import express from "express";
import User from "../models/User.js";

const router = express.Router();

// routes/auth.js ya controller mein

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy check
  if (email === "anshu@gmail.com" && password === "123456") {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: 1, name: "anshu", email: "anshu@gmail.com" }
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Dummy check
  if (email === "rajesh@gmail.com" && password === "123456") {
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: 1, name: "rajesh", email: "rajesh@gmail.com" }
    });
  }

  return res.status(401).json({ success: false, message: "Invalid credentials" });
});
// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ username, email, password });

    res.status(201).json(user);
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;