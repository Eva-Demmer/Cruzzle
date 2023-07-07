import { PrismaClient } from "@prisma/client";
import { UpdatePasswordUser, User } from "../interfaces/users.interface";

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
      select: {
        id: true,
        mail: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
        avatar_url: true,
        banner_url: true,
        firstname: true,
        lastname: true,
        link: true,
        birthdate: true,
        share_birthdate: true,
        phone: true,
        share_phone: true,
        biography: true,
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
        position: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            idea_like: true,
            comment: true,
            idea: true,
            comment_like: true,
            favorit: true,
            idea_teams: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const findByMail = async (mail: string) => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        mail,
      },
      select: {
        id: true,
        mail: true,
        hashed_password: true,
        role_id: true,
      },
    });
    console.info("data", data);
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

const updatePassword = async (updatedPassword: UpdatePasswordUser) => {
  const { id, hashed_password: hashedPassword } = updatedPassword;
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: { hashed_password: hashedPassword },
    });
    const { id: userId, mail } = data;
    return { id: userId, mail };
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById, findByMail, update, updatePassword };
