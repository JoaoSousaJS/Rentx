import { AppError } from "@errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a category", async () => {
    const categoryBody = {
      name: "Category 1",
      description: "Category 1 description",
    };
    await createCategoryUseCase.execute(categoryBody);

    const categories = await categoriesRepositoryInMemory.findByName(
      categoryBody.name
    );

    expect(categories).toBeDefined();
    expect(categories.id).toBeDefined();
    expect(categories.name).toBe("Category 1");
  });

  it("should not be able to create a category if it already exists", async () => {
    const categoryBody = {
      name: "Category 1",
      description: "Category 1 description",
    };
    await createCategoryUseCase.execute(categoryBody);

    await expect(
      createCategoryUseCase.execute(categoryBody)
    ).rejects.toBeInstanceOf(AppError);
  });
});
