import express, { Request, Response, NextFunction } from "express";
import {
  getIdeas,
  getIdeaById,
  getIdeaByFilter,
} from "../controllers/ideas.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getIdeas);
router.get("/filter", getIdeaByFilter);

router.get("/:id", getIdeaById);

export default router;
