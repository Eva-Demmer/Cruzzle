import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

// Hash password before storing it in database
const hashPassword = async (
  req: Request,
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

    // Move to next middleware
    next();
  } catch (error) {
    // Handle errors that occurred during hashing
    console.error("Error hashing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// // Verify password
// const verifyPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { password } = req.body;
//     const { hashedPassword } = req.user;

//     // Compare provided password with hashed password
//     const passwordMatch = await bcrypt.compare(password, hashedPassword);

//     if (passwordMatch) {
//       // Passwords match, move to next middleware
//       next();
//     } else {
//       // Passwords do not match, return error response
//       res.status(401).json({ error: "Invalid password" });
//     }
//   } catch (error) {
//     // Handle errors that occurred during verification
//     console.error("Error verifying passwords:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

export default hashPassword;
