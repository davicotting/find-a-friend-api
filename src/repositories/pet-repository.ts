import { Pet, Prisma } from "@/generated/prisma";
export interface FilterPetParams {
  cityId: string;
  petSize?: "SMALL" | "MEDIUM" | "LARGE";
  petEnergy?: number;
  petEnviroment?: "SMALL" | "MEDIUM" | "LARGE";
  requirements?: string[];
}

export interface PetsRepository {
    create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
    findById(id: string): Promise<Pet | null>
    filterPet({ cityId, petEnergy, petEnviroment, petSize, requirements }: FilterPetParams): Promise<Pet[]>
}