import { PrismaClient, type Prisma, type User } from "@prisma/client";
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "secret-key";
const prisma = new PrismaClient();

export const loginController = async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    } as Prisma.UserWhereUniqueInput,
  });

  if (!user) {
    return res.status(401).send("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid Password");
  }

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  return res.json({ token });
};

export const registerController = async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  const existingUser = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  if (existingUser) {
    return res.status(400).send("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

  return res.status(201).json({
    message: "User registered successfully",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      password: user.password,
    },
  });
};
