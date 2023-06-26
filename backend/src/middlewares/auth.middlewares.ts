import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { findByEmail } from "../models/user.model";

dotenv.config();

// TODO: Change secret key
const JWT_SECRET =
  "eb7e49b3511f9638e9478224a105556a4edab4afbc70e6f364b13907f2c3c1cf";

// Define extended Request interface for token
interface ExtendedRequest extends Request {
  token?: string;
  payload?: any;
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

    next();
    // Handle errors that occured during hashing
  } catch (error) {
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

    // Check if user w/ email address exists
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

// Protect routes
const protectRoutes = (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve token
    const authorizationHeader = req.get("Authorization");

    // If token cannot be retrieved, return error response
    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    // If token retrieved, split into authentification type & token
    const [type, token] = authorizationHeader.split(" ");

    // If token is not of type Bearer, return error
    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // If token is of type Bearer, verify token
    req.payload = jwt.verify(token, JWT_SECRET);

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export { hashPassword, verifyPassword, protectRoutes };
