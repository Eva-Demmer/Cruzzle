import { Request, Response } from "express";
import { findAll, findById } from "../models/roles.model";

const getRoles = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getRolesById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({ message: "Not found, cannot find positions" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getRoles, getRolesById };
