import express, { Request, Response, NextFunction } from "express";
import {
  getIdeas,
  getIdeaById,
  getIdeaByFilter,
  getIdeasCreatedToday,
  postIdea,
  deleteIdeaById,
  archivedIdeaById,
  getIdeasTrends,
  updateIdeaById,
  updateIdeaViewById,
} from "../controllers/ideas.controllers";
import { uploadFilesIdea } from "../middlewares/multer.middlewares";
import { protectRoutes } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/ at time: ", Date.now());
  next();
};
router.use(timeLog);

// Protected routes
router.use(protectRoutes);

router.get("/", getIdeas);
router.get("/filter", getIdeaByFilter);
router.get("/trends", getIdeasTrends);

router.get("/:id", getIdeaById);
router.get("/:userId/count", getIdeasCreatedToday);

router.post("/", uploadFilesIdea, postIdea);

router.patch("/archive/:id", archivedIdeaById);
router.put("/:id", uploadFilesIdea, updateIdeaById);
router.patch("/views/:id", updateIdeaViewById);

router.delete("/:id", deleteIdeaById);

export default router;
