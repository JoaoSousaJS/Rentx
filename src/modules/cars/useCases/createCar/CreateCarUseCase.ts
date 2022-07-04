import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({
    name,
    description,
    dailyRate,
    licensePlate,
    fineAmount,
    brand,
    categoryId,
  }: IRequest): Promise<void> {
    const carAlreadyExists = await this.carsRepository.findByLicensePlate(
      licensePlate
    );

    if (carAlreadyExists) {
      throw new AppError(
        `Car with license plate ${licensePlate} already exists`
      );
    }

    await this.carsRepository.create({
      name,
      description,
      dailyRate,
      licensePlate,
      fineAmount,
      brand,
      categoryId,
    });
  }
}

export { CreateCarUseCase };
