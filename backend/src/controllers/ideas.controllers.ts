import { Request, Response } from "express";
import { findAll, findById, findByFilter } from "../models/idea.model";

const getIdeas = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await findById(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).send("Idea not found");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeaByFilter = async (req: Request, res: Response) => {
  const filterQuery = req.query;
  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getIdeas, getIdeaById, getIdeaByFilter };
