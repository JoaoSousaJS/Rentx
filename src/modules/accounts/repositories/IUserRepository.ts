import { Users } from "@prisma/client";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<Users>;
}

export { IUserRepository };
