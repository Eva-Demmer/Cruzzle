// import bcrypt from "bcrypt";
// import { Request, Response, NextFunction } from "express";

// // Number of salt rounds for password hashing
// const saltRounds = 10;

// // Hash password before storing it in database
// const hashPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { password } = req.body;

//     // Generate a salt to use for hashing
//     const salt = await bcrypt.genSalt(saltRounds);

//     // Hash the password using bcrypt
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Replace the plain password with the hashed password in the request body
//     req.body.password = hashedPassword;

//     // Move to the next middleware
//     next();
//   } catch (error) {
//     // Handle any errors that occurred during hashing
//     console.error("Error hashing password:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Compare provided password with hashed password
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
//       // Passwords match, move to the next middleware
//       next();
//     } else {
//       // Passwords do not match, return an error response
//       res.status(401).json({ error: "Invalid password" });
//     }
//   } catch (error) {
//     // Handle any errors that occurred during comparison
//     console.error("Error comparing passwords:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export { hashPassword, verifyPassword };
