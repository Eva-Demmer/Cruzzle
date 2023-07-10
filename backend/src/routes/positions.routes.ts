import express, { Request, Response, NextFunction } from "express";
import { getPositions } from "../controllers/positions.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/positions/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getPositions);

export default router;
