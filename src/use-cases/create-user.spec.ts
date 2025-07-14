import { describe, expect, it, beforeEach } from "vitest";
import { CreateUserUseCase} from "./create-user";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create an user", async () => {
    const { user } = await sut.execute({
      email: "davicotting2323@gmail.com",
      password: "123456",
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "USER",
    });


    expect(user.role).toBe("USER")
    expect(user.created_at).toEqual(expect.any(Date));
  });

  it("should be not able to create an ORG or USER with same email", async () => {
    await sut.execute({
      email: "davicotting2323@gmail.com",
      password: "123456",
      name: "Org Davi Cotting",
      phone: "85988483936",
      role: "ORG", 
    });

    await expect(() =>
      sut.execute({
        email: "davicotting2323@gmail.com",
        password: "123456",
        name: "Org Davi Cotting",
        phone: "85988483936",
        role: "ORG",
      })
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError);
  }); 

  
});
