import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("CreateCarUseCase", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Car 1",
      description: "Car 1 description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 10,
      brand: "Fiat",
      categoryId: "category-1",
    });

    expect(car.id).toBeDefined();
  });

  it("should not be able to create a car with duplicated license plate", async () => {
    await createCarUseCase.execute({
      name: "Car 1",
      description: "Car 1 description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 10,
      brand: "Fiat",
      categoryId: "category-1",
    });

    expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Car 1 description",
        dailyRate: 100,
        licensePlate: "ABC-1234",
        fineAmount: 10,
        brand: "Fiat",
        categoryId: "category-1",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should always create an available car ", async () => {
    const body = {
      name: "Car 1",
      description: "Car 1 description",
      dailyRate: 100,
      licensePlate: "ABC-1234",
      fineAmount: 10,
      brand: "Fiat",
      categoryId: "category-1",
    };
    const car = await createCarUseCase.execute(body);

    expect(car.available).toBeTruthy();
  });
});
