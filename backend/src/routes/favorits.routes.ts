import express, { Request, Response, NextFunction } from "express";
import {
  getFavorits,
  getFavoritesByFilter,
  postFavorit,
  removeFavorit,
} from "../controllers/favorits.controllers";

const router = express.Router();

const timeLog = (req: Request, res: Response, next: NextFunction) => {
  console.info("use /api/favorits/ at time: ", Date.now());
  next();
};
router.use(timeLog);

router.get("/", getFavorits);
router.get("/filter", getFavoritesByFilter);

router.post("/", postFavorit);
router.delete("/", removeFavorit);

export default router;
