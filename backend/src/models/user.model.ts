import { PrismaClient } from "@prisma/client";
import User from "../interfaces/users.interface";

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

// const findByEmail = async (mail: string) => {
//   try {
//     const data = await prisma.user.findUnique({
//       where: {
//         mail,
//       },
//     });
//     return data;
//   } finally {
//     await prisma.$disconnect();
//   }
// };

const create = async (user: User) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        mail: user.mail,
        hashed_password: user.hashed_password,
        role_id: user.role_id,
        avatar_url: user.avatar_url,
        banner_url: user.banner_url,
        firstname: user.firstname,
        lastname: user.lastname,
        birthdate: user.birthdate,
        share_birthdate: user.share_birthdate,
        phone: user.phone,
        share_phone: user.share_phone,
        biography: user.biography,
        agency_id: user.agency_id,
        joined_at: user.joined_at,
        position_id: user.position_id,
        score_comment: user.score_comment,
        score_idea: user.score_idea,
        score_like: user.score_like,
        created_at: user.created_at,
        is_active: user.is_active,
      },
    });
    return createdUser;
  } catch (error) {
    throw new Error("Error creating user.");
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

const deactivate = async (id: number) => {
  try {
    const data = await prisma.user.update({
      where: { id },
      data: { is_active: false },
    });
    return data;
  } catch (error) {
    throw new Error("Error making user inactive.");
  } finally {
    await prisma.$disconnect();
  }
};

const reactivate = async (id: number) => {
  try {
    const data = await prisma.user.update({
      where: { id },
      data: { is_active: true },
    });
    return data;
  } catch (error) {
    throw new Error("Error reactivating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById, create, update, deactivate, reactivate };
