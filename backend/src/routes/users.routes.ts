import express, { Request, Response, NextFunction } from "express";
import { uploadImage } from "../middlewares/multer.middlewares";
import {
  login,
  getUsers,
  getUserById,
  updateUser,
  getUserByFilter,
  updateImage,
  getImageHighRes,
  verifyPasswordUser,
  updatePasswordUser,
} from "../controllers/users.controllers";

import {
  hashPassword,
  verifyPassword,
  // protectRoutes,
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
router.get("/filter", getUserByFilter);
router.get("/image", getImageHighRes);
router.get("/:id", getUserById);
router.post("/image/:id", uploadImage, updateImage);
router.post("/verifyPassword", verifyPasswordUser);

// // Protected routes
// TODO: decomment line below when we want to protect routes
// router.use(protectRoutes);
router.put("/updatePassword", hashPassword, updatePasswordUser);
router.put("/:id", hashPassword, updateUser);

export default router;
