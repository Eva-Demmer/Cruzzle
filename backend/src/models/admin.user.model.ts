/* eslint-disable @typescript-eslint/naming-convention */
import { PrismaClient } from "@prisma/client";
import {
  CreateUser,
  UserLoginUpdatedRequest,
} from "../interfaces/users.interface";

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

const updateByIdByAdmin = async (id: number, userUpdated: CreateUser) => {
  try {
    const data = await prisma.user.update({
      where: {
        id,
      },
      data: userUpdated,
    });
    return data;
  } catch (error) {
    throw new Error("Error updating user.");
  } finally {
    await prisma.$disconnect();
  }
};

export { findAllByAdmin, findByIdByAdmin, updateByIdByAdmin };
