import { PrismaClient } from "@prisma/client";
import { IdeaFilterQuery } from "../interfaces/ideas.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.favorit.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByFilter = async (filterQuery: IdeaFilterQuery) => {
  const { userId } = filterQuery;
  console.info("from model ", filterQuery);

  let { selectedCategories } = filterQuery;

  if (!selectedCategories) {
    selectedCategories = [];
  }

  try {
    const data = await prisma.favorit.findMany({
      where: {
        user_id: userId ? parseInt(userId, 10) : undefined,
      },
      select: {
        idea: {
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
            created_at: true,
            archived_at: true,
            deleted_at: true,
            favorit: true,
            goal: true,
            profits: true,
            risks: true,
            primary_img: true,
            views: true,
            attachment: true,
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
            _count: {
              select: {
                idea_like: true,
                comment: true,
                attachment: true,
                idea_teams: true,
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
          },
        },
      },
    });

    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const createFavorit = async (userId: number, ideaId: number) => {
  try {
    const existingFavorit = await prisma.favorit.findFirst({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });

    if (!existingFavorit) {
      const data = await prisma.favorit.create({
        data: {
          user_id: userId,
          idea_id: ideaId,
        },
      });
      return data;
    }
    return false;
  } catch (error) {
    throw new Error("Error creating new favorite");
  } finally {
    await prisma.$disconnect();
  }
};

const deleteFavorit = async (userId: number, ideaId: number) => {
  try {
    const existingFavorit = await prisma.favorit.findFirst({
      where: {
        user_id: userId,
        idea_id: ideaId,
      },
    });

    if (existingFavorit) {
      await prisma.favorit.delete({
        where: {
          id: existingFavorit.id,
        },
      });
      return true;
    }
    return false;
  } catch (error) {
    throw new Error("Error deleting favorite");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findByFilter, createFavorit, deleteFavorit };
