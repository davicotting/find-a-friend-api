import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetPetDetailsUseCase } from "../get-pet-details";

export async function MakeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
