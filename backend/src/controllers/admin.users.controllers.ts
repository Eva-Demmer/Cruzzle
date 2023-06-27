import { Request, Response } from "express";
import { findAllByAdmin } from "../models/admin.user.model";

const getUsersByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserByIdByAdmin = async (req: Request, res: Response) => {
  console.info("getUserByIdByAdmin", req);
  res.status(500).send("error");
};

export { getUsersByAdmin, getUserByIdByAdmin };