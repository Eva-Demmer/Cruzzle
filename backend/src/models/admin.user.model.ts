import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.user.findMany({
      select: {
        id: true,
        mail: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        firstname: true,
        lastname: true,
        agency: {
          select: {
            id: true,
            name: true,
            city: true,
            country: true,
          },
        },
        joined_at: true,
        created_at: true,
        is_active: true,
        position: {
          select: {
            id: true,
            name: true,
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
    const response = await prisma.user.findUnique({
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
