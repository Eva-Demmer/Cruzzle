import express, { Application, Request, Response } from "express";
import usersRoutes from "./users.routes";
import ideasRoutes from "./ideas.routes";
import adminRoutes from "./admin.routes";

const app: Application = express();

const welcome = (req: Request, res: Response) => {
  res.send("Welcome to cruzzle API");
};
app.get("/", welcome);

app.use("/api/users", usersRoutes);
app.use("/api/ideas", ideasRoutes);
app.use("/api/admin", adminRoutes);

export default app;
