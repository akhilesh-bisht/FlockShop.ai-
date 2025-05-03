import { User } from "../models/user.model.js";

//  register User

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "User already exists. Please log in." });
    }

    // Validate password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long." });
    }

    // Create new user
    const newUser = await User.create({
      email: normalizedEmail,
      password,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required." });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ error: "Invalid email or password." });
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Generate token
    const accessToken = user.generateAccessToken();

    // Send token in cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Logout User
export const logoutUser = (req, res) => {
  try {
    // Clear the access token cookie to log the user out
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
