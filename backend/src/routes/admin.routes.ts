import express, { Request, Response, NextFunction } from "express";
import { getUsersByAdmin } from "../controllers/admin.users.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/admin/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/users", getUsersByAdmin);

export default router;
