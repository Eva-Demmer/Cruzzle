import express, { Request, Response, NextFunction } from "express";
import {
  createCommentLike,
  deleteCommentLike,
  getCommentsLikes,
  getCommentsLikesById,
} from "../controllers/comments_likes.controllers";
// import {
//   creatComment,
//   deleteComment,
//   getCommentByIdeaId,
//   getComments,
//   updateComment,
// } from "../controllers/comments.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/likes at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getCommentsLikes);
router.get("/:id", getCommentsLikesById);
router.post("/", createCommentLike);
// router.put("/:id", updateComment);
router.delete("/:id", deleteCommentLike);

export default router;
