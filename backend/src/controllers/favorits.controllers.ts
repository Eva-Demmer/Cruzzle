import { Request, Response } from "express";

import { findAll, createFavorit, deleteFavorit } from "../models/favorit.model";

const getFavorits = async (req: Request, res: Response) => {
  try {
    const data = await findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postFavorit = async (req: Request, res: Response) => {
  try {
    const { userId, ideaId } = req.body;

    const data = await createFavorit(userId, ideaId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const removeFavorit = async (req: Request, res: Response) => {
  try {
    const { userId, ideaId } = req.body;

    await deleteFavorit(userId, ideaId);
    res.status(200).send("Favorit successfully deleted");
  } catch (error) {
    res.status(500).send(error);
  }
};

export { getFavorits, postFavorit, removeFavorit };
