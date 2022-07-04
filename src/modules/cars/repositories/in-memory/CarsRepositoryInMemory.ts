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
  }: ICreateCarDto): Promise<Cars> {
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

    return this.cars[this.cars.length - 1];
  }

  async list(): Promise<Cars[]> {
    return this.cars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Cars> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}

export { CarsRepositoryInMemory };
