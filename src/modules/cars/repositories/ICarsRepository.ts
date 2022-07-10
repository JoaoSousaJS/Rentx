import { Cars } from "@prisma/client";

import { ICreateCarDto } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Cars>;
  findAvailable(
    brand?: string,
    categoryId?: string,
    name?: string
  ): Promise<Cars[]>;
  findByLicensePlate(licensePlate: string): Promise<Cars | undefined>;
}

export { ICarsRepository };
