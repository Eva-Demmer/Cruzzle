import { Request, Response } from "express";
import { getDBConnection } from "../config/database";

import { getAllUsers, getUserById } from "../models/user.model";

const getUsers = async (req: Request, res: Response) => {
  try {
    const connection = await getDBConnection();
    const data = await getAllUsers(connection);
    res.status(200).json(data);
    connection.release();
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserbyId = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const connection = await getDBConnection();
    const data = await getUserById(connection, id);
    res.status(200).json(data);
    connection.release();
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getUsers, getUserbyId };
