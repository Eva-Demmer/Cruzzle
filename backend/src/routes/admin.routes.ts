import express, { Request, Response, NextFunction } from "express";
import {
  getUsersByAdmin,
  CreateUserByAdmin,
  updateUserByIdByAdmin,
} from "../controllers/admin.users.controllers";
import {
  getIdeasByAdmin,
  ArchiveByIdByAdmin,
  DeleteByIdByAdmin,
} from "../controllers/admin.ideas.controllers";
import { getRolesByAdmin } from "../controllers/admin.roles.controllers";
import { getAgenciesByAdmin } from "../controllers/admin.agencies.controllers";
import { getPositionsByAdmin } from "../controllers/admin.positions.controllers";
import {
  getCategoriesByAdmin,
  deleteCategoriesByIdByAdmin,
} from "../controllers/admin.categories.controllers";

import { hashPassword } from "../middlewares/auth.middlewares";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/admin/users/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/users", getUsersByAdmin);
router.post("/users", hashPassword, CreateUserByAdmin);
router.put("/users/:id", hashPassword, updateUserByIdByAdmin);

router.get("/ideas", getIdeasByAdmin);
router.put("/ideas/archive/:id", ArchiveByIdByAdmin);
router.put("/ideas/delete/:id", DeleteByIdByAdmin);

router.get("/roles", getRolesByAdmin);

router.get("/agencies", getAgenciesByAdmin);

router.get("/positions", getPositionsByAdmin);

router.get("/categories", getCategoriesByAdmin);
router.delete("/categories/id", deleteCategoriesByIdByAdmin);

export default router;
