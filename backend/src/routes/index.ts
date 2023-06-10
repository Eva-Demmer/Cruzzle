import express, { Application, Request, Response } from "express";
import usersRoutes from "./users.routes";

const app: Application = express();

const welcome = (req: Request, res: Response) => {
  res.send("Welcome to cruzzle API");
};
app.get("/", welcome);

app.use("/api/users", usersRoutes);

export default app;
