import { Pet, PetEnviroment, PetSize, Requirements } from "@/generated/prisma";
import { PetsRepository } from "@/repositories/pet-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { ForbiddenRoleActionError } from "./errors/forbidden-role-action-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { CityRepository } from "@/repositories/city-repository";

interface CreatePetUseCaseRequest {
  address: string;
  cityId: string;
  name: string;
  petEnergy: number;
  petEnviroment: PetEnviroment;
  petSize: PetSize;
  description: string | null;
  userId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    address,
    cityId,
    description,
    name,
    petEnergy,
    petEnviroment,
    petSize,
    userId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const user = await this.usersRepository.findByUserId(userId);

    if (!user) {
      throw new ResourceNotFoundError();
    }

    if (user?.role !== "ORG") {
      throw new ForbiddenRoleActionError();
    }

    const pet = await this.petRepository.create({
      address,
      cityId,
      name,
      petEnergy,
      petEnviroment,
      petSize,
      userId,
      description,
      
    });

    return {
      pet,
    };
  }
}
