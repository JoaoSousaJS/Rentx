import { Categories } from "@prisma/client";

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Categories[] = [];

  async list(): Promise<Categories[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Categories | undefined> {
    return this.categories.find((category) => category.name === name);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    this.categories.push({
      name,
      description,
      id: "",
      createdAt: undefined,
      updatedAt: undefined,
    });
  }
}

export { CategoriesRepositoryInMemory };
