import { PrismaClient } from "@prisma/client";
import Attachments from "../interfaces/attachments.interface";

const prisma = new PrismaClient();

const createAttachements = async (attachments: Attachments[]) => {
  try {
    const data = await prisma.attachment.createMany({
      data: attachments,
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const getAllAttachementsByIdeaId = async (id: number) => {
  try {
    const data = await prisma.attachment.findMany({
      where: { idea_id: id },
    });
    return data;
  } finally {
    await prisma.$disconnect();
  }
};

const deleteAllAttachmentsByIdea = async (id: number) => {
  try {
    const req = await prisma.attachment.deleteMany({
      where: { idea_id: id },
    });
    return req;
  } finally {
    await prisma.$disconnect();
  }
};

export {
  createAttachements,
  getAllAttachementsByIdeaId,
  deleteAllAttachmentsByIdea,
};
