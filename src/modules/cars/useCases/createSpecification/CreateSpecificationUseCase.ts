import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../shared/errors/AppError";
import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationUseCase: ISpecificationRepository
  ) {}
  async execute({ name, description }: IRequest) {
    const specificationExists = await this.specificationUseCase.findByName(
      name
    );

    if (specificationExists) {
      throw new AppError(`Specification ${name} already exists`);
    }

    await this.specificationUseCase.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
