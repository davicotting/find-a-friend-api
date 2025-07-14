import { describe, expect, it, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { GetPetDetailsUseCase } from "./get-pet-details";
import { InMemoryCityRepository } from "@/repositories/in-memory/in-memory-city-repository";
import { hash } from "bcrypt";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryPetsRepository: InMemoryPetsRepository;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryCityRepository: InMemoryCityRepository;
let sut: GetPetDetailsUseCase;

describe("Get Pet Details Use Case", () => {
  beforeEach(() => {
    inMemoryPetsRepository = new InMemoryPetsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryCityRepository = new InMemoryCityRepository();
    sut = new GetPetDetailsUseCase(inMemoryPetsRepository);
  });

  it("should be get pet details", async () => {
    const user = await inMemoryUsersRepository.create({
      email: "davicotting2323@gmail.com",
      password_hash: await hash("123456", 6),
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });

    const { id } = await inMemoryCityRepository.create("Fortaleza");

    const createdPet = await inMemoryPetsRepository.create({
      petSize: "SMALL",
      petEnviroment: "SMALL",
      petEnergy: 5,
      name: "Klaus",
      description: "klauso lindo da mamaezinha linda dele",
      cityId: id,
      address: "Beira mar",
      userId: user.id,
    });

    const { pet } = await sut.execute({ id: createdPet.id });

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Klaus",
        description: "klauso lindo da mamaezinha linda dele",
      })
    );
  });

  it("should be not able to get details of inexistent pet", async () => {
    await expect(() =>
      sut.execute({ id: "inexistent-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
