import express, { Request, Response, NextFunction } from "express";
import {
  getNotificationIdea,
  createNotificationIdea,
  updateNotificationIdea,
  deleteNotificationIdea,
  deleteManyNotificationIdea,
} from "../controllers/notifications.ideas.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/notifications/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.post("/ideas", createNotificationIdea);
router.get("/ideas/:id", getNotificationIdea);
router.put("/ideas/delete", deleteManyNotificationIdea);
router.put("/ideas/:id", updateNotificationIdea);
router.delete("/ideas/:id", deleteNotificationIdea);

export default router;
