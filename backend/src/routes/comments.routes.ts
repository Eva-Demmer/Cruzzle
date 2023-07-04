import express, { Request, Response, NextFunction } from "express";
import {
  creatComment,
  deleteComment,
  getCommentByIdeaId,
  getComments,
  updateComment,
} from "../controllers/comments.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/comments at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getComments);
router.get("/:id", getCommentByIdeaId);
router.post("/", creatComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
