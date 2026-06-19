import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const ifexist = await User.findOne({ email });
    if (ifexist) {
      return res.status(400).json("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json("Could not create User");
  }
};