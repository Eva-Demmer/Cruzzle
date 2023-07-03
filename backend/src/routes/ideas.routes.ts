import express, { Request, Response, NextFunction } from "express";
import {
  getIdeas,
  getIdeaById,
  getIdeaByFilter,
  getIdeasCreatedToday,
  postIdea,
  deleteIdeaById,
  archivedIdeaById,
  updateIdeaById,
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
router.get("/:userId/count", getIdeasCreatedToday);

router.get("/:id", getIdeaById);

router.post("/", uploadFilesIdea, postIdea);

router.patch("/archive/:id", archivedIdeaById);
router.put("/:id", uploadFilesIdea, updateIdeaById);
router.delete("/:id", deleteIdeaById);

export default router;
