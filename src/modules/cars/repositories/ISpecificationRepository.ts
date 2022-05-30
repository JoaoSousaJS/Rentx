import { Specifications } from "@prisma/client";

interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specifications>;
  list(): Promise<Specifications[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
