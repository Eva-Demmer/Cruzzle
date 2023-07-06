import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { findByMail } from "../models/user.model";

dotenv.config();
const { JWT_SECRET } = process.env;

// Hash password before storing it in the database
const hashPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { password } = req.body;
  if (password) {
    try {
      const saltRounds = 11;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      delete req.body.password;
      req.body.hashed_password = hashedPassword;

      next();
    } catch (error) {
      console.error("Error hashing password:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    next();
  }
};

// Verify password
const verifyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mail, password } = req.body;
    const dataUser = await findByMail(mail);

    if (dataUser) {
      const passwordMatch = await bcrypt.compare(
        password,
        dataUser.hashed_password
      );

      if (passwordMatch) {
        next();
      } else {
        res.status(401).json({ error: "Wrong password." });
      }
    } else {
      res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    console.error("Error verifying passwords:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Protect routes
const protectRoutes = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const decodedToken = jwt.verify(token, JWT_SECRET as Secret);
      console.info(decodedToken);
      next();
    } catch (error) {
      console.error("Error verifying token:", error);
      res.status(401).json({ error: "Invalid token." });
    }
  } else {
    res.status(401).json({ error: "No token provided." });
  }
};

export { hashPassword, verifyPassword, protectRoutes };
