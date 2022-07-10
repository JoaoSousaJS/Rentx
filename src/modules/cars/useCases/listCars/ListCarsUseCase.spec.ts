import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  const carBody = {
    name: "Car 1",
    description: "Car 1 description",
    dailyRate: 100,
    licensePlate: "ABC-1234",
    fineAmount: 10,
    brand: "Fiat",
    categoryId: "category-1",
  };

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    await carsRepositoryInMemory.create(carBody);

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by name", async () => {
    await carsRepositoryInMemory.create(carBody);

    const cars = await listCarsUseCase.execute({
      name: carBody.name,
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by brand", async () => {
    await carsRepositoryInMemory.create(carBody);

    const cars = await listCarsUseCase.execute({
      name: carBody.brand,
    });

    expect(cars).toHaveLength(1);
  });

  it("should be able to list all available cars by category", async () => {
    await carsRepositoryInMemory.create(carBody);

    const cars = await listCarsUseCase.execute({
      name: carBody.categoryId,
    });

    expect(cars).toHaveLength(1);
  });
});
