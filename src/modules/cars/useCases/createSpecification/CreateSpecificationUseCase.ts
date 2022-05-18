import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specificationUseCase: ISpecificationRepository) {}
  execute({ name, description }: IRequest) {
    const specificationExists = this.specificationUseCase.findByName(name);

    if (specificationExists) {
      throw new Error(`Specification ${name} already exists`);
    }

    this.specificationUseCase.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
