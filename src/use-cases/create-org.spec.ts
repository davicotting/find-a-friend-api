import { describe, expect, it, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";

let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(inMemoryOrgRepository);
  });

  it("should create an user", async () => {
    const { org } = await sut.execute({
      email: "davicotting2323@gmail.com",
      password: "123456",
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });

    expect(org.created_at).toEqual(expect.any(Date));
  });

  it("should be not able to creat an org with same email", async () => {
    await sut.execute({
      email: "davicotting2323@gmail.com",
      password: "123456",
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });

    await expect(() =>
      sut.execute({
        email: "davicotting2323@gmail.com",
        password: "123456",
        name: "Org Davi Cotting",
        phone: "85988483936",
        role: "USER",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
    
  });
});
