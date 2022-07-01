import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  const userBody: ICreateUserDTO = {
    name: "User 1",
    email: "user@test.com",
    password: "1234",
    driverLicense: "000123",
  };
  beforeEach(async () => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    );
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    await createUserUseCase.execute(userBody);
  });

  it("should be able to authenticate an user", async () => {
    const result = await authenticateUserUseCase.execute({
      email: userBody.email,
      password: userBody.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "false@email.com",
        password: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: userBody.email,
        password: "wrong password",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
