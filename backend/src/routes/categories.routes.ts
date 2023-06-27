import express, { Request, Response, NextFunction } from "express";
import {
  getCategories,
  getCategoriesById,
} from "../controllers/categories.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getCategories);
router.get("/:id", getCategoriesById);

export default router;
