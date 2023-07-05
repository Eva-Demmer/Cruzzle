import { Request, Response, NextFunction } from "express";

import {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  deactivate,
  reactivate,
} from "../models/user.model";
import { verifyPassword } from "../middlewares/auth.middlewares";

// Show all users
const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Show specific user based on their ID
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

// Login validation based on email & password verification
const login = async (req: Request, res: Response) => {
  const { mail } = req.body;
  try {
    // Find user based on their email address
    const data = await findByEmail(mail);
    // If user exists, verify password input
    if (data) {
      await verifyPassword(req, res, () => {
        // If passwords match, login successful
        res.status(200).send("Login successful");
      });
    } else {
      res.status(401).send("No match: Invalid email or password");
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send(error);
  }
};

// Create new user
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const createdUser = await create(user); //
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update user
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

// Set is_active to false
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

// Set is_active to true
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

const updateAvatar = (req: Request, res: Response) => {
  console.info("From back : ", req.body);
};

export {
  getUsers,
  getUserById,
  // getUserByEmail,
  login,
  createUser,
  updateUser,
  deactivateUser,
  reactivateUser,
  updateAvatar,
};
