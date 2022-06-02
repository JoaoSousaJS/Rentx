import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    password,
    driverLicense,
    email,
  }: ICreateUserDTO): Promise<void> {
    await this.usersRepository.create({
      name,
      password,
      driverLicense,
      email,
    });
  }
}

export { CreateUserUseCase };
