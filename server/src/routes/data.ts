import { authorizeRole } from "../middleware/roleMiddleware";
import express, { Request, Response } from "express";

const router = express.Router();

router.get(
  "/admin",
  authorizeRole(["admin"]),
  (_req: Request, res: Response) => {
    res.json({ message: "Admin data" });
  },
);

export default router;
