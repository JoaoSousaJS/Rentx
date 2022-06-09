import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { UsersRepository } from "../../repositories/implementations/UserRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository
  ) {}
  async execute({ userId, avatarFile }: IRequest) {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("Invalid operation");
    }

    await this.usersRepository.updateAvatar(user.id, avatarFile);
  }
}

export { UpdateUserAvatarUseCase };
