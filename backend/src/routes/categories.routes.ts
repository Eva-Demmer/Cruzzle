import express, { Request, Response, NextFunction } from "express";
import {
  getCategories,
  getCategoriesById,
} from "../controllers/categories.controllers";
import getCategoriesUsageCount from "../controllers/idea_category.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/categories/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getCategories);
router.get("/order", getCategoriesUsageCount);
router.get("/:id", getCategoriesById);

export default router;
