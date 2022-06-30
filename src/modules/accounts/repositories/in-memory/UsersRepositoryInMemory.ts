import { Users } from "@prisma/client";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

class UsersRepositoryInMemory implements IUserRepository {
  private users: Users[] = [];

  public async findByEmail(email: string): Promise<Users | undefined> {
    return this.users.find((user) => user.email === email);
  }

  public async findById(id: string): Promise<Users | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async updateAvatar(userId: string, avatarFile: string): Promise<void> {
    const user = await this.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.avatar = avatarFile;
  }

  public async create({
    name,
    email,
    password,
    driverLicense,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    this.users.push({
      name,
      email,
      password,
      driverLicense,
      avatar,
      id: "",
      isAdmin: false,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
}

export { UsersRepositoryInMemory };
