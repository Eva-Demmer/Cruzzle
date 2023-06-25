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
  } finally {
    await prisma.$disconnect();
  }
};

const update = async (id: number, updatedUser: User) => {
  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: updatedUser,
    });
    return result;
  } finally {
    await prisma.$disconnect();
  }
};

const remove = async (id: number) => {
  try {
    const result = await prisma.user.delete({
      where: {
        id,
      },
    });
    return !!result;
  } finally {
    await prisma.$disconnect();
  }
};

export { findAll, findById, create, update, remove };
