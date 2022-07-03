import { Cars } from "@prisma/client";

import { ICreateCarDto } from "../dtos/ICreateCarDTO";

interface ICarsRepository {
  create(data: ICreateCarDto): Promise<void>;
  list(): Promise<Cars[]>;
}

export { ICarsRepository };
