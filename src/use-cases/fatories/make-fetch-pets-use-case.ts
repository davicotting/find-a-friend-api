import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FetchPetsUseCase } from "../fetch-pets";
import { PrismaCityRepository } from "@/repositories/prisma/prisma-city-repository";

export async function MakeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const cityRepository = new PrismaCityRepository();
  const fetchPetUseCase = new FetchPetsUseCase(petsRepository, cityRepository);

  return fetchPetUseCase;
}
