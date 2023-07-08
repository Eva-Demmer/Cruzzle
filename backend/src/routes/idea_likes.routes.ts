import express, { Request, Response, NextFunction } from "express";
import {
  getIdeaLikes,
  getIdeaLikesById,
  getTotalLikesByUserId,
  createIdeaLike,
  deleteIdeaLike,
} from "../controllers/idea_likes.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/ideas/likes at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getIdeaLikes);
router.get("/:id", getIdeaLikesById);
router.get("/users/:userId", getTotalLikesByUserId);
router.post("/", createIdeaLike);

router.delete("/:id", deleteIdeaLike);

export default router;
