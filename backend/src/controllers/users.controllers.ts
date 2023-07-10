import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import dotenv from "dotenv";
import {
  findAll,
  findById,
  findByMail,
  update,
  updateUserImage,
} from "../models/user.model";

import {
  uploadImageToFirebase,
  getUrlByNameAndRoute,
} from "../services/firebase";
import { verifyPassword } from "../middlewares/auth.middlewares";
import findByFilter from "../models/userFilter.model";
import { UserFilterQuery } from "../interfaces/users.interface";

dotenv.config();
const { JWT_SECRET } = process.env;

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

// Login validation based on email and password verification & generation of token
const login = async (req: Request, res: Response) => {
  const { mail } = req.body;
  try {
    const data = await findByMail(mail);
    if (data) {
      await verifyPassword(req, res, () => {
        try {
          const payload = {
            id: data.id,
            role_id: data.role_id,
          };

          const token = jwt.sign(payload, JWT_SECRET as Secret, {
            algorithm: "HS256",
            expiresIn: "12h",
          });
          res.status(200).json({ token });
        } catch (error) {
          console.error("Error generating token:", error);
          res.status(500).send("Error generating token");
        }
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

const getUserByFilter = async (req: Request, res: Response) => {
  const filterQuery: UserFilterQuery = req.query;

  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getImageHighRes = async (req: Request, res: Response) => {
  const { url } = req.body;
  try {
    const getUrl = await getUrlByNameAndRoute(url);
    if (getUrl) {
      res.status(200).json(getUrl);
    }
    res.status(404).send("File not found in firebase");
  } catch (error) {
    console.error(error);
  }
};

const updateImage = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const files: Express.Multer.File[] = req.files as Express.Multer.File[];

  try {
    const isCropOnly = req.files?.length === 1;

    if (files) {
      if (!isCropOnly) {
        const uploads = await uploadImageToFirebase(files, id);
        if (uploads) {
          const uploadBlob = uploads.filter(
            (item) => !item.fileName.includes("_img")
          );

          const key = `${uploadBlob[0].fileName}_url`;
          const updatedImage = { [key]: uploadBlob[0].url };

          const updateImageUser = await updateUserImage(updatedImage, id);
          if (updateImageUser) {
            res.status(201).json(updateImageUser);
          } else {
            res.status(404).json({ message: "Not found user" });
          }
        }
      } else {
        const uploadABlob = files[0];
        const upload = await uploadImageToFirebase([uploadABlob], id);
        if (upload) {
          const { fieldname } = uploadABlob;
          const key = `${fieldname}_url`;
          const updatedImage = { [key]: upload[0].url };

          const updateImageUser = await updateUserImage(updatedImage, id);
          if (updateImageUser) {
            res.status(201).json(updateImageUser);
          } else {
            res.status(404).json({ message: "Not found user" });
          }
        } else {
          res.status(500).json({ message: "Upload to firebase failed" });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export {
  getUsers,
  getUserById,
  login,
  updateUser,
  getUserByFilter,
  updateImage,
  getImageHighRes,
};
