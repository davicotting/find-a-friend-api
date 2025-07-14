import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryCityRepository } from "@/repositories/in-memory/in-memory-city-repository";
import { CreateCityUseCase } from "./create-city";
import { CityAlreadyExistsError } from "./errors/city-already-exists-error";

let inMemoryCityRepository: InMemoryCityRepository;
let sut: CreateCityUseCase;

describe("Create City Use Case", () => {
  beforeEach(() => {
    inMemoryCityRepository = new InMemoryCityRepository();
    sut = new CreateCityUseCase(inMemoryCityRepository);
  });

  it("should be able to create a city", async () => {
    const { city } = await sut.execute({
      name: "Fortaleza",
    });

    expect(city.created_at).toEqual(expect.any(Date));
    expect(city.name).toEqual("Fortaleza");
  });

  it("should be not able to create a city with same name", async () => {
    await sut.execute({
      name: "Fortaleza",
    });

    await expect(() =>
      sut.execute({
        name: "Fortaleza",
      })
    ).rejects.toBeInstanceOf(CityAlreadyExistsError);

    expect(inMemoryCityRepository.cities).toHaveLength(1);
  });
});
