import { Request, Response } from "express";
import {
  findAll,
  findById,
  // create,
  update,
  remove,
} from "../models/user.model";

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
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// const postUser = async (req: Request, res: Response) => {
//   try {
//     const user = req.body;
//     const createdUser = await create(user);
//     res.status(201).json(createdUser);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const putUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const updatedUser = req.body;
  try {
    const result = await update(id, updatedUser);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const result = await remove(id);
    if (result) {
      res.sendStatus(204);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getUsers, getUserById, putUser, deleteUser };
