interface ICreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  driverLicense: string;
}

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
}

export { IUserRepository };
