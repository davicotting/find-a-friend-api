import { City } from "@/generated/prisma";
import { CityRepository } from "@/repositories/city-repository";
import { CityAlreadyExistsError } from "./errors/city-already-exists-error";

interface CreateCityUseCaseRequest {
  name: string;
}

interface CreateCityUseCaseResponse {
  city: City;
}

export class CreateCityUseCase {
  constructor(private cityRepository: CityRepository) {}

  async execute({
    name,
  }: CreateCityUseCaseRequest): Promise<CreateCityUseCaseResponse> {
    const cityExists = await this.cityRepository.findByName(name);

    if (cityExists) {
      throw new CityAlreadyExistsError();
    }

    const city = await this.cityRepository.create(name);

    return {
      city,
    };
  }
}
