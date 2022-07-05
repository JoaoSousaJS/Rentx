import { inject, injectable } from "tsyringe";

import { SpecificationRepository } from "@modules/cars/infra/prisma/repositories/SpecificationRepository";
import { Specifications } from "@prisma/client";

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
