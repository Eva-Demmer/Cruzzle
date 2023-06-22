import express, { Request, Response, NextFunction } from "express";
import { getUsers, getUserById } from "../controllers/users.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
