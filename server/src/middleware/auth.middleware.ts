import express from "express";
import jwt from "jsonwebtoken";

const auth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.header("authentication");
    const secret = process.env.JWT_SECRET;

    if (!token) {
      req.body = {
        ...req.body,
        user: null,
      };
      next();
    } else {
      const user = jwt.verify(token, secret);
      req.body = {
        ...req.body,
        user,
      };
      next();
    }
  } catch (error) {
    throw error;
  }
};

export default auth;
