import express, { Request, Response, NextFunction } from "express";
import { getIdeas } from "../controllers/ideas.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};

router.use(timeLog);
router.get("/", getIdeas);

export default router;
