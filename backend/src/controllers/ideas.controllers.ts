import { Request, Response } from "express";

import {
  findAll,
  findById,
  findByUserIdAndDate,
  createIdea,
  addPrimaryImgIdea,
  deleteIdea,
  archiveIdea,
} from "../models/idea.model";
import findByFilter from "../models/ideaFilter.model";
import { uploadToFirebase } from "../services/uploadTofFirebase";
import { UploadedFiles } from "../interfaces/uploadedfiles.interface";
import { createAttachements } from "../models/attachments.models";
import { createTeams } from "../models/idea_teams.models";
import { UserTeams } from "../interfaces/idea_teams.interface";
import { FormattedCategory } from "../interfaces/idea_category.interface";
import { createCategoryByIdea } from "../models/idea_category.models";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

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
  const filterQuery: IdeaFilterQuery = req.query;
  try {
    const data = await findByFilter(filterQuery);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getIdeasCreatedToday = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.userId, 10);
  try {
    const today = new Date();
    const count = await findByUserIdAndDate(userId, today);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).send(error);
  }
};

// const getIdeasCreatedToday = async (req: Request, res: Response) => {
//   const userIdString: string = req.params.userId;
//   if (Number.isNaN(Number(userIdString))) {
//     res.status(400).json({ error: "Invalid userId" });
//     return;
//   }
//   const userId: number = parseInt(userIdString, 10);
//   try {
//     const today = new Date();
//     const count = await findByUserIdAndDate(userId, today);
//     res.status(200).json({ count });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

const postIdea = async (req: Request, res: Response) => {
  try {
    const { team, categories, ...idea } = req.body;

    // getIdByUserToken and set userId
    const userId = 1;

    const createdIdea = await createIdea(idea, userId);
    const idIdea = createdIdea.id;

    // If primaryImg or Attachements exists
    if (req.files && Object.keys(req.files).length > 0) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      const allFiles: Express.Multer.File[] = [];

      for (const fieldName in files) {
        if (Object.prototype.hasOwnProperty.call(files, fieldName)) {
          const fieldFiles = files[fieldName];
          allFiles.push(...fieldFiles);
        }
      }

      const uploadedFiles = await uploadToFirebase(allFiles);
      let pictureIdea: UploadedFiles;
      let attachements: Array<UploadedFiles> = [];

      // Check if primaryImg exist else only attachments exists
      if (uploadedFiles[0].type === "primaryImg") {
        const [primaryImg, ...attachments] = uploadedFiles;
        attachements = attachments;
        pictureIdea = primaryImg;
        await addPrimaryImgIdea(idIdea, pictureIdea.url);
      } else {
        attachements = uploadedFiles;
      }

      if (attachements.length > 0) {
        const formattedAttachments = attachements.map((attachment) => ({
          idea_id: idIdea,
          content_url: attachment.url,
        }));
        await createAttachements(formattedAttachments);
      }
    }

    if (team.length > 0) {
      const formattedTeams = JSON.parse(team).map((user: UserTeams) => ({
        user_id: user.user_id,
        idea_id: idIdea,
      }));
      await createTeams(formattedTeams);
    }

    if (categories.length > 0) {
      const formattedCategories = JSON.parse(categories).map(
        (category: FormattedCategory) => ({
          idea_id: idIdea,
          category_id: category.id,
        })
      );
      await createCategoryByIdea(formattedCategories);
    }

    res.status(201).json({ id: idIdea });
  } catch (error) {
    res.status(500).json({ "Error when post idea :": error });
  }
};

const deleteIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await deleteIdea(id);
    res.status(204).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

const archivedIdeaById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const data = await archiveIdea(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getIdeas,
  getIdeaById,
  getIdeaByFilter,
  getIdeasCreatedToday,
  postIdea,
  deleteIdeaById,
  archivedIdeaById,
};
