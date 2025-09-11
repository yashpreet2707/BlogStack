import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Fixed typo: was "psroduction"
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  path: "/",
};

// signup logic
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, "User with this email already exists"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (err) {
    next(errorHandler(500, "Something went wrong. Please try again later."));
  }
};

// signin logic
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(400, "Invalid credentials"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(400, "Invalid credentials"));

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;

    // Set cookie and return token in response body for Authorization header approach
    res
      .status(200)
      .cookie("access_token", token, cookieOptions)
      .json({
        ...rest,
        token, // Include token in response for localStorage storage
      });
  } catch (err) {
    next(errorHandler(500, "Something went wrong during signin"));
  }
};

// google logic
export const google = async (req, res, next) => {
  const { name, email, googlePhotoURL } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const generatedPass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPass, 10);

      user = new User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoURL,
      });

      await user.save();
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, ...rest } = user._doc;

    // Set cookie and return token in response body for Authorization header approach
    res
      .status(200)
      .cookie("access_token", token, cookieOptions)
      .json({
        ...rest,
        token, // Include token in response for localStorage storage
      });
  } catch (err) {
    console.error("Google auth error:", err);
    next(errorHandler(500, "Something went wrong with Google auth"));
  }
};
