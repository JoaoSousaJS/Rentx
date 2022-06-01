import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

class UsersRepository implements IUserRepository {
  create(data: ICreateUserDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
