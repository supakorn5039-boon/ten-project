import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authorizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      res.status(401).json({ message: "No Token provided" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

      if (!roles.includes(decoded.role)) {
        res.status(403).json({ message: "You're not admin!!" });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid Token" });
    }
  };
};
