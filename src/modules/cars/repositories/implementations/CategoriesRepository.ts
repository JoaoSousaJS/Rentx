import { Categories, PrismaClient } from "@prisma/client";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

const prisma = new PrismaClient();

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: PrismaClient["categories"];
  constructor() {
    this.repository = prisma.categories;
  }

  async create({ name, description }: ICreateCategoryDTO) {
    await this.repository.create({
      data: {
        name,
        description,
      },
    });
  }

  async list(): Promise<Categories[]> {
    const categories = await this.repository.findMany();
    return categories;
  }

  async findByName(name: string): Promise<Categories> {
    const category = await this.repository.findUnique({
      where: {
        name,
      },
    });

    return category;
  }
}

export { CategoriesRepository };
