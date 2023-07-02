import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const findAllByAdmin = async () => {
  try {
    const data = await prisma.idea.findMany({
      select: {
        id: true,
        title: true,
        user: {
          select: {
            id: true,
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
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        views: true,
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
            favorit: true,
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
    const response = await prisma.idea.findUnique({
      select: {
        id: true,
        title: true,
        user: {
          select: {
            id: true,
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
          },
        },
        created_at: true,
        archived_at: true,
        deleted_at: true,
        views: true,
        _count: {
          select: {
            idea_like: true,
            comment: true,
            attachment: true,
            idea_teams: true,
            favorit: true,
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
