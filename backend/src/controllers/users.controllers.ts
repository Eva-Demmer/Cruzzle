import { Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  findAll,
  findById,
  findByMail,
  update,
  updatePassword,
  findLeaderboard,
} from "../models/user.model";
import { verifyPassword } from "../middlewares/auth.middlewares";
import findByFilter from "../models/userFilter.model";
import {
  UserFilterQuery,
  FormattedUserLeaderboard,
} from "../interfaces/users.interface";
import calculateLeaderboardScore from "../utils/leaderboard";

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

// Show top 3 Cruzzlers for the current month
const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const data = await findLeaderboard();
    if (data) {
      const formattedData: FormattedUserLeaderboard[] = data
        .map((item) => {
          const { _count: count, ...rest } = item;
          return {
            ...rest,
            score: calculateLeaderboardScore(item),
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);
      res.status(200).send(formattedData);
    }
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
// Update Password user
const updatePasswordUser = async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const result = await updatePassword(data);
    if (result) {
      res.sendStatus(200);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Verify password
const verifyPasswordUser = async (req: Request, res: Response) => {
  try {
    const { mail, password } = req.body;
    const dataUser = await findByMail(mail);

    if (dataUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        dataUser.hashed_password
      );

      const data = {
        id: dataUser.id,
        mail: dataUser.mail,
      };

      if (passwordMatch) {
        res.status(200).json(data);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    console.error("Error verifying passwords:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Filter users
const getUserByFilter = async (req: Request, res: Response) => {
  const filterQuery: UserFilterQuery = req.query;

  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getUsers,
  getUserById,
  login,
  updateUser,
  getUserByFilter,
  verifyPasswordUser,
  updatePasswordUser,
  getLeaderboard,
};
