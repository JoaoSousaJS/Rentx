import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Cars } from "@prisma/client";

interface IRequest {
  categoryId?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ categoryId, brand, name }: IRequest): Promise<Cars[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      categoryId,
      name
    );

    return cars;
  }
}

export { ListCarsUseCase };
