import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    user.password = await bcrypt.hash(req.body.password, 12);
    const newUser = await user.save();
    newUser.password = undefined;
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "Auth failed, Invalid email" });
    }
    const isPassEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isPassEqual) {
      return res.status(400).json({ message: "Auth failed, Invalid password" });
    }
    const tokenObject = {
      fullName: user.username,
      email: user.email,
    };
    const jwtToken = jwt.sign(tokenObject, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({ jwtToken });
  } catch (error) {
    return res.status(400).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, {password: 0});
    return res.status(200).json({users});
  } catch (error) {
    return res.status(400).json(error);
  }
};

export { createUser, loginUser, getAllUsers };
