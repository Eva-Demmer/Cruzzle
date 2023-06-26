import express, { Request, Response, NextFunction } from "express";
import {
  createUser,
  login,
  getUsers,
  getUserById,
  // getUserByEmail,
  updateUser,
  deactivateUser,
  reactivateUser,
} from "../controllers/users.controllers";
import { hashPassword, verifyPassword } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.post("/", hashPassword, createUser);
router.post("/login", verifyPassword, login);
router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deactivateUser);
router.put("/:id", reactivateUser);

export default router;
