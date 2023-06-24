import express, { Request, Response, NextFunction } from "express";
import {
  getIdeas,
  getIdeaById,
  getIdeaByFilter,
  postIdea,
} from "../controllers/ideas.controllers";
import { uploadFilesIdea } from "../middlewares/multer.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getIdeas);
router.get("/filter", getIdeaByFilter);

router.get("/:id", getIdeaById);

router.post("/", uploadFilesIdea, postIdea);

export default router;
