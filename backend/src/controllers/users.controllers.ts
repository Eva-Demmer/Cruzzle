import { Request, Response } from "express";
import { findAll, findById } from "../models/user.model";

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (!data || data.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).json(data[0]);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getUsers, getUserById };
