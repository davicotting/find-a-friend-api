import { Pet, Prisma } from "@/generated/prisma";
import { FilterPetParams, PetsRepository } from "../pet-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      address: data.address,
      cityId: data.cityId,
      name: data.name,
      petEnergy: data.petEnergy,
      petEnviroment: data.petEnviroment,
      petSize: data.petSize,
      created_at: new Date(),
      description: data.description ?? null,
      id: randomUUID(),
      userId: data.userId,
      requirements: Array.isArray(data.requirements) ? data.requirements : [],
    };

    this.items.push(pet);

    return pet;
  }

  async findById(id: string) {
    const pet = this.items.find((pet) => pet.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

 async filterPet({
  cityId,
  petEnergy,
  petEnviroment,
  petSize,
  requirements,
}: FilterPetParams): Promise<Pet[]> {
  const pets = this.items.filter((pet) => {
    if (pet.cityId !== cityId) return false;

    if (petSize && pet.petSize !== petSize) return false;

    if (petEnviroment && pet.petEnviroment !== petEnviroment) return false;

    if (petEnergy && pet.petEnergy !== petEnergy) return false;

    if (requirements && requirements.length > 0) {
      const matchesAtLeastOne = requirements.some((requirement) =>
        pet.requirements.includes(requirement)
      );
      if (!matchesAtLeastOne) return false;
    }

    return true;
  });

  return pets;
}
}
