import { Users } from "@prisma/client";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<Users>;
  findById(id: string): Promise<Users>;
  updateAvatar(userId: string, avatarFile: string): Promise<void>;
}

export { IUserRepository };
