const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { username, email, password, course } = req.body;

  // Validate required fields
  if ( !username || !email || !password || !course) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Validate course
  const validCourses = [
    "10th", "11th Science", "11th Commerce", "11th Humanities",
    "12th Science", "12th Commerce", "12th Humanities"
  ];
  if (!validCourses.includes(course)) {
    return res.status(400).json({ message: "Invalid course selection." });
  }

  try {
    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: "Username or email already exists." });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      course,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error." });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        user: {
          id: user._id,
          course: user.course,
          role: user.role,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      id: user._id,
      course: user.course,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error." });
  }
};
