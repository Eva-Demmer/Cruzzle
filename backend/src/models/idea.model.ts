import { PrismaClient } from "@prisma/client";

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

export { findAll, findById };
