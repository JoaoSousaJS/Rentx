import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDTO";
import { Cars } from "@prisma/client";

import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Cars[] = [];

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
  }: ICreateCarDto): Promise<void> {
    this.cars.push({
      id: "",
      name,
      description,
      brand,
      dailyRate,
      fineAmount,
      licensePlate,
      categoryId,
      available: true,
      createdAt: undefined,
      updatedAt: undefined,
    });
  }

  async list(): Promise<Cars[]> {
    return this.cars;
  }
}

export { CarsRepositoryInMemory };
