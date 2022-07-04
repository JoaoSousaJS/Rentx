import { Cars } from "@prisma/client";

import { ICreateCarDto } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<Cars>;
  list(): Promise<Cars[]>;
  findByLicensePlate(licensePlate: string): Promise<Cars | undefined>;
}

export { ICarsRepository };
