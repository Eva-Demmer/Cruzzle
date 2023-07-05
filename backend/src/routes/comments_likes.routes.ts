import express, { Request, Response, NextFunction } from "express";
import {
  createCommentLike,
  deleteCommentLike,
  getCommentsLikes,
  getCommentsLikesById,
} from "../controllers/comments_likes.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/likes at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getCommentsLikes);
router.get("/:id", getCommentsLikesById);
router.post("/", createCommentLike);

router.delete("/:id", deleteCommentLike);

export default router;
