import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { GetPetDetailsUseCase } from "../get-pet-details";

export async function MakeGetPetDeailsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetDetailsUseCase = new GetPetDetailsUseCase(petsRepository);

  return getPetDetailsUseCase;
}
