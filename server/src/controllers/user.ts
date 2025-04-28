import { PrismaClient } from "@prisma/client";
import type { Request, RequestHandler, Response } from "express";

const prisma = new PrismaClient();

export const getUsers: RequestHandler = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
