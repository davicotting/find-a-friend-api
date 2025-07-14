import { describe, expect, it, beforeEach } from "vitest";
import { FetchPetsUseCase } from "./fetch-pets";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { InMemoryCityRepository } from "@/repositories/in-memory/in-memory-city-repository";
import { CityRepository } from "@/repositories/city-repository";
import { PetsRepository } from "@/repositories/pet-repository";
import { UsersRepository } from "@/repositories/users-repository";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { CityNotExistsError } from "./errors/city-not-exists-error";

let inMemoryPetsRepository: PetsRepository;
let inMemoryCityRepository: CityRepository;
let inMemoryUsersRepository: UsersRepository;
let sut: FetchPetsUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryCityRepository = new InMemoryCityRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new FetchPetsUseCase(inMemoryPetsRepository, inMemoryCityRepository);
  });

  it("should be able to fetch filter pets", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "johndoe@example.com",
      name: "john doe",
      password_hash: "123456",
      phone: "85988483936",
      role: "ORG",
    });

    const fortaleza = await inMemoryCityRepository.create("Fortaleza");
    const maracanau = await inMemoryCityRepository.create("Maracanaú");

    await inMemoryPetsRepository.create({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Klaus",
      description: "klauso lindo da mamaezinha linda dele",
      cityId: fortaleza.id,
      address: "Beira mar",
      userId: user.id,
      requirements: ["Precisa de carinho a cada 1 minuto", "gosta de peixe"],
    });

    await inMemoryPetsRepository.create({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Simão",
      description: "filhote de poodle",
      cityId: maracanau.id,
      address: "Maracanaú",
      userId: user.id,
      requirements: ["gosta de brincar com bolinha", "gosta de comer sorvete"],
    });

    const { pets } = await sut.execute({
      cityId: fortaleza.id,
      petEnergy: 5,
      petEnviroment: "SMALL",
      petSize: "SMALL",
    });

    expect(pets).toHaveLength(1);

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Klaus",
        }),
      ])
    );
  });

  it("should be able to fetch filter pets if only cityId has been provided", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "johndoe@example.com",
      name: "john doe",
      password_hash: "123456",
      phone: "85988483936",
      role: "ORG",
    });

    const fortaleza = await inMemoryCityRepository.create("Fortaleza");

    await inMemoryPetsRepository.create({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Klaus",
      description: "klauso lindo da mamaezinha linda dele",
      cityId: fortaleza.id,
      address: "Beira mar",
      userId: user.id,
      requirements: ["Precisa de carinho a cada 1 minuto", "gosta de peixe"],
    });

    await inMemoryPetsRepository.create({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Simão",
      description: "filhote de poodle",
      cityId: fortaleza.id,
      address: "Maracanaú",
      userId: user.id,
      requirements: ["gosta de brincar com bolinha", "gosta de comer sorvete"],
    });

    const { pets } = await sut.execute({
      cityId: fortaleza.id,
    });

    expect(pets).toHaveLength(2);

    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "Klaus",
        }),
        expect.objectContaining({
          name: "Simão",
        }),
      ])
    );
  });

  it("should be able to fetch pets", async () => {
    await expect(() =>
      sut.execute({
        cityId: "inexistent-city",
        petEnergy: 5,
        petEnviroment: "SMALL",
        petSize: "SMALL",
      })
    ).rejects.toBeInstanceOf(CityNotExistsError);
  });
});
