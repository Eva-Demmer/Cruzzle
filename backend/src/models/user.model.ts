import { PrismaClient } from "@prisma/client";
import { User, CreateUser } from "../interfaces/users.interface";

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

const create = async (user: CreateUser) => {
  try {
    const createdUser = await prisma.user.create({
      data: {
        mail: user.mail,
        hashed_password: user.hashed_password,
        role_id: user.role_id,
        firstname: user.firstname,
        lastname: user.lastname,
        agency_id: user.agency_id,
        joined_at: user.joined_at,
        position_id: user.position_id,
        is_active: true,
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
    throw new Error("Error deactivating user.");
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

export {
  findAll,
  findById,
  findByEmail,
  create,
  update,
  deactivate,
  reactivate,
};
