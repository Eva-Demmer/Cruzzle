import { Request, Response } from "express";
import { findAllByAdmin, updateByIdByAdmin } from "../models/admin.user.model";

const getUsersByAdmin = async (req: Request, res: Response) => {
  try {
    const data = await findAllByAdmin();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUserByIdByAdmin = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  try {
    const data = await updateByIdByAdmin(id, updatedUser);
    if (data) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Not found, cannot update user" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getUsersByAdmin, updateUserByIdByAdmin };
