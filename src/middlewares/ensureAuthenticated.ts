import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import "dotenv";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, process.env.JWT_SECRET);

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId as string);

    if (!user) {
      throw new Error("User does not exists");
    }
    next();
  } catch (error) {
    throw new Error("Invalid token");
  }
}
