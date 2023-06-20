import { Request, Response } from "express";
import dotenv, { DotenvConfigOptions } from "dotenv";
// import database from "" <-----------implement later;

dotenv.config(<DotenvConfigOptions>{ silent: true });

const getIdeas = (req: Request, res: Response) => {
  res.status(200).json(req.query);
};

const getIdeasById = (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  res.send(`here is idea ${id}`);
};

export { getIdeas, getIdeasById };
