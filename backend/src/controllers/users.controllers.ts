import { Request, Response } from "express";
import {
  findAll,
  findById,
  // findByEmail,
  create,
  update,
  deactivate,
  reactivate,
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

// const getUserByEmail = async (req: Request, res: Response) => {
//   const { email } = req.params;
//   try {
//     const data = await findByEmail(email);
//     if (data) {
//       res.status(200).json(data);
//     } else {
//       res.status(404).send("User not found");
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const createdUser = await create(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req: Request, res: Response) => {
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

const deactivateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const result = await deactivate(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const reactivateUser = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const result = await reactivate(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deactivateUser,
  reactivateUser,
};
