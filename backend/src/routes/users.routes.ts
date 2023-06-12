import express, { Request, Response, NextFunction } from "express";
import {
  getUsers,
  getUsersById,
  postUser,
  updateUserById,
  deleteUserById,
} from "../controllers/users.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};

router.use(timeLog);
router.get("/", getUsers);
router.post("/", postUser);

router.get("/:id", getUsersById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
