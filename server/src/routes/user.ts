import express from "express";
import { verifyToken } from "../middleware/authMiddleware";
import { getUsers } from "../controllers/user";

const router = express.Router();

router.get("/", verifyToken, getUsers);

export default router;
