import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Car 1 description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 10,
      brand: "Fiat",
      categoryId: "category-1",
    });
  });
});
