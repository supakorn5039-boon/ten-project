import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { loginController, registerController } from "../controllers/auth";

const router = express.Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await loginController(req, res);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await registerController(req, res);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
