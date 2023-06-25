import express, { Request, Response, NextFunction } from "express";
import {
  getUsers,
  getUserById,
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

router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser); // user et admin

// api/admin/users/:id
// api/admin/users/
router.post("/", hashPassword, createUser); // admin
router.delete("/:id", deactivateUser); // admin
router.put("/:id", reactivateUser); // admin

export default router;
