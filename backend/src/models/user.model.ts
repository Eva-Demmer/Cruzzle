import { PrismaClient } from "@prisma/client";
import { User } from "../interfaces/users.interface";

const prisma = new PrismaClient();

const findAll = async () => {
  try {
    const data = await prisma.user.findMany();
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findById = async (id: number) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

// TODO: change to findUnique once Prisma changed
const findByEmail = async (mail: string) => {
  try {
    const data = await prisma.user.findMany({
      where: {
        mail,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const update = async (id: number, updatedUser: User) => {
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById, findByEmail, update };
