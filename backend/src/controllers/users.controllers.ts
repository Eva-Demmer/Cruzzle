import { Request, Response } from "express";
import dotenv, { DotenvConfigOptions } from "dotenv";
// import database from "" <-----------implement later;

// import { UserReqBody } from "../interfaces/users.interface";

dotenv.config(<DotenvConfigOptions>{ silent: true });

const getUsers = (req: Request, res: Response) => {
  res.send("here is users list");
};

const getUsersById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  res.send(`here is user ${id}`);
};

const postUser = (req: Request, res: Response) => {
  console.info(req.body);
  res.sendStatus(201);
};

const updateUserById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  console.info(id, req.body);
  res.sendStatus(201);
};

const deleteUserById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  console.info(id, req.body);
  res.sendStatus(204);
};

export { getUsers, getUsersById, postUser, updateUserById, deleteUserById };
