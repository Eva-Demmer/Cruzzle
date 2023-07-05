import express, { Request, Response, NextFunction } from "express";
import {
  login,
  getUsers,
  getUserById,
  updateUser,
} from "../controllers/users.controllers";

import {
  hashPassword,
  verifyPassword,
  protectRoutes,
} from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

// Public route
router.post("/login", verifyPassword, login);
router.get("/", getUsers);
router.get("/:id", getUserById);

// Protected routes
router.use(protectRoutes);
router.put("/:id", hashPassword, updateUser);

export default router;
