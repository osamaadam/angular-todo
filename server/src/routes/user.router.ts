import User from "../models/user.model";
import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/register", async (req, res) => {
  const {
    password,
    username,
  }: { password: string; username: string } = req.body;

  const email: string = req.body.email.toLowerCase();

  if (!email.trim() || !password.trim() || !username.trim())
    res.status(400).json({ error: "Missing fields!" });

  const userExists = await User.findOne({ email }).exec();

  if (userExists)
    res
      .status(400)
      .json({ error: "An account with the same email already exists!" });

  const newUser = new User({
    email,
    username,
    password,
  });

  try {
    const secret: string = process.env.JWT_SECRET;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newUser.password, salt);
    newUser.password = hash;
    const user = await newUser.save();
    user.password = undefined;

    const token = jwt.sign({ _id: user._id }, secret, { expiresIn: 3600 });

    res.json({
      token,
      user,
    });
  } catch (error) {
    throw error;
  }
});

router.post("/login", async (req, res) => {
  const email: string = req.body.email.toLowerCase();
  const { password }: { password: string } = req.body;

  try {
    const user = await User.findOne({ email }).exec();

    if (!user)
      res.status(404).json({
        error: "User not found!",
      });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      res.status(401).json({
        error: "Invalid credentials!",
      });
    const secret: string = process.env.JWT_SECRET;

    user.password = undefined;
    const token = jwt.sign({ _id: user._id }, secret);
    res.json({
      token,
      user,
    });
  } catch (error) {
    throw error;
  }
});

export default router;
