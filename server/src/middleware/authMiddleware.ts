import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret-key";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(403).send("Token is required");
    return;
  }

  jwt.verify(token, JWT_SECRET, (err) => {
    if (err) {
      res.status(403).send("Invalid token.");
      return;
    }
    next();
  });
};
