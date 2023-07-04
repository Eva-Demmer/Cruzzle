import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.favorit.findMany();
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

export { findAll, createFavorit, deleteFavorit };
