import { describe, expect, it, beforeEach } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";
import { LoginUseCase } from "./login";
import { hash } from "bcrypt";

let inMemoryOrgRepository: InMemoryOrgRepository;
let sut: LoginUseCase;

describe("Login Use Case", () => {
  beforeEach(() => {
    inMemoryOrgRepository = new InMemoryOrgRepository();
    sut = new LoginUseCase(inMemoryOrgRepository);
  });

  it("should be able to make login for the user", async () => {
    await inMemoryOrgRepository.create({
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
      phone: "85988483936",
      role: "ADMIN",
    });

    const { org } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(org.created_at).toEqual(expect.any(Date));
  });
});
