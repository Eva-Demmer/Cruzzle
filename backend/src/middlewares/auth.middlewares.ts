import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { findByEmail } from "../models/user.model";

dotenv.config();

// TODO: Change secret key
const JWT_SECRET =
  "eb7e49b3511f9638e9478224a105556a4edab4afbc70e6f364b13907f2c3c1cf";

// Define an extended Request interface
interface ExtendedRequest extends Request {
  token?: string;
}

// Hash password before storing it in the database
const hashPassword = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password } = req.body;

    // Generate salt
    const saltRounds = 11;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Replace plain password with hashed password
    delete req.body.password;
    req.body.hashed_password = hashedPassword;

    // Move to the next middleware
    next();
  } catch (error) {
    // Handle errors that occurred during hashing
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Verify password & generate JWT
const verifyPassword = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { mail, password } = req.body;

    const [dataUser] = await findByEmail(mail);

    // Check if user w/ email address exists in database
    if (dataUser) {
      // User exists: Compare provided password with hashed password
      const passwordMatch = await bcrypt.compare(
        password,
        dataUser.hashed_password
      );

      // Check if passwords match
      if (passwordMatch) {
        const payload = { sub: dataUser.id };

        // Passwords match: Create JWT token with a secret key
        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: "1h",
        });

        // Attach the token to the request object
        req.token = token;

        // Move to the next middleware
        next();
        // Passwords do not match: Return error response
      } else {
        res.status(401).json({ error: "Wrong login credentials." });
      }

      // User does not exist: Return error response
    } else {
      res.status(404).json({ error: "User not found" });
    }

    // Handle errors that occurred during verification
  } catch (error) {
    console.error("Error verifying passwords:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { hashPassword, verifyPassword };
