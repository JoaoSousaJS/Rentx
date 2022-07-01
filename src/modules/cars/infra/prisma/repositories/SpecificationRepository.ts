import { PrismaClient, Specifications } from "@prisma/client";

import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from "../ISpecificationRepository";

const prisma = new PrismaClient();

class SpecificationRepository implements ISpecificationRepository {
  private readonly repository: PrismaClient["specifications"];
  constructor() {
    this.repository = prisma.specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    await this.repository.create({
      data: { name, description },
    });
  }

  async findByName(name: string): Promise<Specifications> {
    const specification = await this.repository.findUnique({
      where: { name },
    });

    return specification;
  }

  async list(): Promise<Specifications[]> {
    const specifications = await this.repository.findMany();
    return specifications;
  }
}

export { SpecificationRepository };
