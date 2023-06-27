import { Request, Response } from "express";
import { findAllByAdmin } from "../models/admin.category.model";

const getCategoriesByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCategoryByIdByAdmin = async (req: Request, res: Response) => {
  console.info("getUserByIdByAdmin", req);
  res.status(500).send("error");
};

export { getCategoriesByAdmin, getCategoryByIdByAdmin };
