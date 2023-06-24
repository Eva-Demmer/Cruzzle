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

// const create = async (user: User) => {
//   try {
//     const createdUser = await prisma.user.create({
//       data: user,
//     });
//     return createdUser;
//   } finally {
//     await prisma.$disconnect();
//   }
// };

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

export { findAll, findById, update, remove };
