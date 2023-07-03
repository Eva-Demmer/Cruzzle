import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.category.findMany({
      select: {
        id: true,
        label: true,
        color: true,
        _count: {
          select: {
            idea_category: true,
          },
        },
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByIdByAdmin = async (id: number) => {
  try {
    const response = await prisma.category.findUnique({
      select: {
        id: true,
        label: true,
        color: true,
        _count: {
          select: {
            idea_category: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return response;
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, findByIdByAdmin };
