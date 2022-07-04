import { Cars } from "@prisma/client";

import { ICreateCarDto } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<void>;
  list(): Promise<Cars[]>;
  findByLicensePlate(licensePlate: string): Promise<Cars | undefined>;
}

export { ICarsRepository };
