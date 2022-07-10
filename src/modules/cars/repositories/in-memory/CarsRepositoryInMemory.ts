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

  async findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Cars[]> {
    const cars = this.cars.filter((car) => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (categoryId && car.categoryId === categoryId) ||
        (name && car.name === name)
      ) {
        return car;
      }

      return null;
    });

    return cars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Cars> {
    return this.cars.find((car) => car.licensePlate === licensePlate);
  }
}

export { CarsRepositoryInMemory };
