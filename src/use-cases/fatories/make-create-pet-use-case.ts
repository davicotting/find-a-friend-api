import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pet-repository";
import { CreatePetUseCase } from "../create-pet";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export async function MakeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const usersRepository = new PrismaUsersRepository();
  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    usersRepository
  );

  return createPetUseCase;
}
