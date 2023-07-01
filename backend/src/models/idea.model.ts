import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { Idea, IdeaFilterQuery, PostIdea } from "../interfaces/ideas.interface";

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
      where: {
        id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findByUserIdAndDate = async (userId: number, date: Date) => {
  try {
    const response = await prisma.idea.count({
      where: {
        user_id: userId,
        created_at: {
          gte: new Date(date.setHours(0, 0, 0, 0)),
          lt: new Date(date.setHours(23, 59, 59, 999)),
        },
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

const findByFilter = async (filterQuery: IdeaFilterQuery) => {
  const {
    publicationDateStart,
    publicationDateEnd,
    autorSelectionTag,
    selectedCategories = null,
    trendingTag,
    titleContains = null,
    hasAttachment,
    hasNoComment,
  } = filterQuery;

  console.info(publicationDateStart, dayjs(publicationDateStart).toISOString());
  console.info(publicationDateEnd);
  console.info(autorSelectionTag);
  console.info(selectedCategories);
  console.info(trendingTag);
  console.info(titleContains);
  console.info(hasAttachment);
  console.info(hasNoComment);
  try {
    const data = await prisma.idea.findMany({
      where: {
        created_at: {
          gte: dayjs(publicationDateStart).subtract(1, "day").toISOString(),
          lte: dayjs(publicationDateEnd).toISOString(),
        },
      },
      orderBy: {
        created_at: "asc",
      },
    });
    return data;
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

export {
  findAll,
  findById,
  findByUserIdAndDate,
  findByFilter,
  createIdea,
  addPrimaryImgIdea,
  deleteIdea,
  archiveIdea,
};
