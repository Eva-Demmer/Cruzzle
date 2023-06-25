import express, { Request, Response, NextFunction } from "express";
import {
  getUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deactivateUser,
  reactivateUser,
} from "../controllers/users.controllers";
import hashPassword from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/email", getUserByEmail);

router.post("/", hashPassword, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

router.put("/:id", updateUser);

router.delete("/:id", deactivateUser);
router.put("/:id", reactivateUser);

export default router;
