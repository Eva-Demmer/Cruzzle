import express, { Request, Response, NextFunction } from "express";
import { getAgencies } from "../controllers/agencies.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/agencies/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getAgencies);

export default router;
