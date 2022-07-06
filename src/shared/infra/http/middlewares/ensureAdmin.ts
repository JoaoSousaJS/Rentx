import { NextFunction, Request, Response } from "express";

import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UserRepository";
import { AppError } from "@shared/errors/AppError";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(id);

  if (!user) {
    throw new AppError("User not found");
  }

  if (!user.isAdmin) {
    throw new AppError("User is not admin");
  }

  return next();
}
