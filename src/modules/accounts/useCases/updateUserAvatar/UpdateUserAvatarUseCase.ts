import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { deleteFIle } from "../../../../utils/file";
import { UsersRepository } from "../../infra/prisma/repositories/UserRepository";

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

    if (user.avatar) {
      await deleteFIle(`./tmp/avatar/${user.avatar}`);
    }

    if (!user) {
      throw new AppError("Invalid operation");
    }

    await this.usersRepository.updateAvatar(user.id, avatarFile);
  }
}

export { UpdateUserAvatarUseCase };
