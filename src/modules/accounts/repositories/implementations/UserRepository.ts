import { PrismaClient, Users } from "@prisma/client";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

const prisma = new PrismaClient();

class UsersRepository implements IUserRepository {
  private readonly repository: PrismaClient["users"];
  constructor() {
    this.repository = prisma.users;
  }

  async create({
    name,
    email,
    password,
    driverLicense,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    await this.repository.create({
      data: { name, email, password, driverLicense, avatar },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.repository.findUnique({
      where: { email },
    });

    return user;
  }

  async findById(id: string): Promise<Users> {
    const user = await this.repository.findUnique({
      where: { id },
    });

    return user;
  }

  async updateAvatar(userId: string, avatarFile: string): Promise<void> {
    await this.repository.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatarFile,
      },
    });
  }
}

export { UsersRepository };
