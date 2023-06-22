import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

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

  console.info(publicationDateStart);
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
          lte: publicationDateEnd,
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

export { findAll, findById, findByFilter };
