import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { InMemoryCityRepository } from "@/repositories/in-memory/in-memory-city-repository";
import { CreatePetUseCase } from "./create-pet";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { hash } from "bcrypt";
import { ForbiddenRoleActionError } from "./errors/forbidden-role-action-error";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCityRepository: InMemoryCityRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCityRepository = new InMemoryCityRepository();
    sut = new CreatePetUseCase(inMemoryPetsRepository, inMemoryUsersRepository);
  });

  it("should be able to create an pet", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "davicotting2323@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "ORG",
    });

    const city = await inMemoryCityRepository.create("Fortaleza");

    const { pet } = await sut.execute({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Klaus",
      description: "klauso lindo da mamaezinha linda dele",
      cityId: city.id,
      address: "Beira mar",
      userId: user.id,
      requirements: ["Precisa de carinho a cada 1 minuto", "gosta de peixe"],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet.name).toEqual("Klaus");
    expect(pet.requirements).toEqual(
      expect.arrayContaining([
        "Precisa de carinho a cada 1 minuto",
        "gosta de peixe",
      ])
    );
  });

  it("should be not able to user create a pet if your role is USER", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "davicotting2323@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });

    const city = await inMemoryCityRepository.create("Fortaleza");

    await expect(() =>
      sut.execute({
        petSize: "SMALL",
        petEnviroment: "SMALL",
        petEnergy: 5,
        name: "Klaus",
        description: "klauso lindo da mamaezinha linda dele",
        cityId: city.id,
        address: "Beira mar",
        userId: user.id,
        requirements: ["Precisa de carinho a cada 1 minuto", "gosta de peixe"],
      })
    ).rejects.toBeInstanceOf(ForbiddenRoleActionError);
  });

  it("should be not able to user create a pet if not exists", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "davicotting2323@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });

    const city = await inMemoryCityRepository.create("Fortaleza");

    await expect(() =>
      sut.execute({
        petSize: "SMALL",
        petEnviroment: "SMALL",
        petEnergy: 5,
        name: "Klaus",
        description: "klauso lindo da mamaezinha linda dele",
        cityId: city.id,
        address: "Beira mar",
        userId: "inexistent-id",
        requirements: ["Precisa de carinho a cada 1 minuto", "gosta de peixe"],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  
});
