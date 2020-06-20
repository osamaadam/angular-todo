import express from "express";
import jwt from "jsonwebtoken";

const auth = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.header("authentication");
  const secret = process.env.JWT_SECRET;

  if (!token) {
    req.body = {
      ...req.body,
      user: null,
    };
    next();
  }

  try {
    const user = jwt.verify(token, secret);
    req.body = {
      ...req.body,
      user,
    };
    next();
  } catch (error) {
    res.status(400).json({
      error: "Token invalid!",
    });
  }
};

export default auth;
