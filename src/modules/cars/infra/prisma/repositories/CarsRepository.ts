import { ICreateCarDto } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Cars, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CarsRepository implements ICarsRepository {
  private readonly repository: PrismaClient["cars"];
  constructor() {
    this.repository = prisma.cars;
  }

  async create({
    name,
    description,
    brand,
    dailyRate,
    fineAmount,
    licensePlate,
    categoryId,
  }: ICreateCarDto): Promise<Cars> {
    const car = await this.repository.create({
      data: {
        name,
        description,
        brand,
        dailyRate,
        fineAmount,
        licensePlate,
        Categories: {
          connect: {
            id: categoryId,
          },
        },
        available: true,
      },
    });

    return car;
  }

  async list(): Promise<Cars[]> {
    const cars = await this.repository.findMany();
    return cars;
  }

  async findByLicensePlate(licensePlate: string): Promise<Cars> {
    const car = await this.repository.findUnique({
      where: { licensePlate },
    });

    return car;
  }
}

export { CarsRepository };
