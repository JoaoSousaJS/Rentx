import { Specifications } from "@prisma/client";
import { inject, injectable } from "tsyringe";

import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";

@injectable()
class ListSpecificationsUseCase {
  constructor(
    @inject("SpecificationRepository")
    private specificationsRepository: SpecificationRepository
  ) {}

  async execute(): Promise<Specifications[]> {
    const specifications = await this.specificationsRepository.list();
    return specifications;
  }
}

export { ListSpecificationsUseCase };
