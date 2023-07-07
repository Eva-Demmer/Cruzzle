import express, { Request, Response, NextFunction } from "express";
import { getRoles } from "../controllers/roles.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/roles/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getRoles);

export default router;
