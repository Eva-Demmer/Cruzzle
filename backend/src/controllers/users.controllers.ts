import { Request, Response } from "express";
import {
  findAll,
  findById,
  findByEmail,
  update,
  updateImageById,
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

const updateImage = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const data: object = req.body;
  console.info(req.body);
  console.info(id);

  // try {
  //   const updatedViews = await updateImageById(id, data);
  //   res.status(201).json({ "Idea views updated !": updatedViews });
  // } catch (error) {
  //   res.status(500).json({ "Error when edit idea views:": error });
  // }
};

export { getUsers, getUserById, login, updateUser, updateImage };
