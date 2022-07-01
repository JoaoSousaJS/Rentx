import { container } from "tsyringe";

import { UsersRepository } from "@modules/accounts/infra/prisma/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { CategoriesRepository } from "@modules/cars/infra/prisma/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/prisma/repositories/SpecificationRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);
