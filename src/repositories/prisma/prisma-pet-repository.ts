import { prisma } from "@/lib/prisma";
import { FilterPetParams, PetsRepository } from "../pet-repository";
import { Prisma } from "@/generated/prisma";
export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data: {
        ...data,
      },
    });
    return pet;
  }
  async filterPet({
    cityId,
    petEnergy,
    petEnviroment,
    petSize,
    requirements,
  }: FilterPetParams) {
    const pets = await prisma.pet.findMany({
      where: {
        cityId,
        petEnergy,
        petSize,
        petEnviroment,
        requirements: requirements ? { hasSome: requirements } : undefined,
      },
    });

    return pets;
  }
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    });
    return pet;
  }
}
