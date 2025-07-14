import { Pet, Prisma } from "@/generated/prisma";
import { PetsRepository } from "../pet-repository";
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
      userId: data.userId
    };

    this.items.push();

    return pet;
  }
}
