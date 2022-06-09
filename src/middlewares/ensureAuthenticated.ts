import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import "dotenv";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, process.env.JWT_SECRET);

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(userId as string);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user = {
      id: user.id,
    };

    next();
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }
}
