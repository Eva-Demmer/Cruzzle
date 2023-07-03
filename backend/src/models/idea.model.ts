import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import {
  Idea,
  IdeaFilterQuery,
  IdeaUpdate,
  PostIdea,
} from "../interfaces/ideas.interface";
import { getFileSize } from "../services/firebase";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.idea.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const response = await prisma.idea.findUnique({
      select: {
        id: true,
        title: true,
        context: true,
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            position: true,
            avatar_url: true,
            agency: true,
          },
        },
        comment: {
          select: {
            id: true,
            user_id: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                avatar_url: true,
              },
            },
            body: true,
            created_at: true,
            comment_like: {
              select: {
                id: true,
                comment_id: true,
                user_id: true,
              },
            },
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        goal: true,
        profits: true,
        risks: true,
        cloudshare: true,
        primary_img: true,
        views: true,
        idea_category: {
          select: {
            id: true,
            category: {
              select: {
                label: true,
                color: true,
              },
            },
          },
        },
        attachment: {
          select: {
            id: true,
            content_url: true,
          },
        },
        idea_teams: {
          select: {
            user_id: true,
            user: {
              select: {
                firstname: true,
                lastname: true,
                position: true,
                avatar_url: true,
                agency: true,
              },
            },
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
          },
        },
      },
      where: {
        id,
      },
    });

    if (response) {
      response.attachment = await Promise.all(
        response.attachment.map(async (attachment) => {
          const size = await getFileSize(attachment.content_url);
          return { ...attachment, size };
        })
      );
    }

    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const createIdea = async (dataIdea: Idea, userId: number): Promise<Idea> => {
  const { title, context, ...otherDataIdea } = dataIdea;

  const data: PostIdea = {
    user_id: userId,
    title,
    context,
  };
  for (const field in otherDataIdea) {
    if (dataIdea[field]) {
      data[field] = dataIdea[field];
    }
  }

  try {
    const createdIdea: Idea = await prisma.idea.create({
      data,
    });
    return createdIdea;
  } catch (error) {
    throw new Error("Error creating new idea");
  } finally {
    await prisma.$disconnect();
  }
};

const addPrimaryImgIdea = async (id: number, url: string) => {
  try {
    const response = await prisma.idea.update({
      where: {
        id,
      },
      data: { primary_img: url },
    });
    return response;
  } catch (error) {
    throw new Error("Error creating new idea");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteIdea = async (id: number) => {
  try {
    const response = await prisma.idea.update({
      where: { id },
      data: { deleted_at: new Date() },
    });
    return response;
  } catch (error) {
    throw new Error("Idea not found");
  } finally {
    await prisma.$disconnect();
  }
};

const archiveIdea = async (id: number) => {
  try {
    const response = await prisma.idea.update({
      where: { id },
      data: { archived_at: new Date() },
    });
    return response;
  } catch (error) {
    throw new Error("Idea not found");
  } finally {
    await prisma.$disconnect();
  }
};

const updateIdea = async (
  id: number,
  updateData: IdeaUpdate
): Promise<Idea | null> => {
  try {
    const updatedIdea = await prisma.idea.update({
      where: { id },
      data: updateData,
    });

    return updatedIdea;
  } catch (error) {
    throw new Error("Error at update idea");
  } finally {
    await prisma.$disconnect();
  }
};

export {
  findAll,
  findById,
  createIdea,
  addPrimaryImgIdea,
  deleteIdea,
  archiveIdea,
  updateIdea,
};
