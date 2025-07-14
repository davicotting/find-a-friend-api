import { PetSize, PetEnviroment, Pet } from "@/generated/prisma";
import { UsersRepository } from "@/repositories/users-repository";
import { PetsRepository } from "@/repositories/pet-repository";
import { CityRepository } from "@/repositories/city-repository";
import { CityNotExistsError } from "./errors/city-not-exists-error";

interface FetchPetsUseCaseRequest {
  cityId: string;
  petEnergy?: number;
  petEnviroment?: PetEnviroment;
  petSize?: PetSize;
  requirements?: string[];
}
interface FetchPetsUseCaseResponse {
  pets: Pet[];
}

export class FetchPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private cityRepository: CityRepository
  ) {}

  async execute({
    cityId,
    petEnergy,
    petEnviroment,
    petSize,
    requirements,
  }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const cityExists = await this.cityRepository.findById(cityId);

    if (!cityExists) {
      throw new CityNotExistsError();
    }

    const pets = await this.petsRepository.filterPet({
      cityId,
      petEnergy,
      petEnviroment,
      petSize,
      requirements,
    });

    return {
      pets,
    };
  }
}
