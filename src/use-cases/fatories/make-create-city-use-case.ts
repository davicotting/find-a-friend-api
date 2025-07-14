import { CreateCityUseCase } from "../create-city";
import { PrismaCityRepository } from "@/repositories/prisma/prisma-city-repository";

export async function MakeCreateCityUseCase() {
  const cityRepository = new PrismaCityRepository();
  const createCityUseCase = new CreateCityUseCase(cityRepository);

  return createCityUseCase;
}
