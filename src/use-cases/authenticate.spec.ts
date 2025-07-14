import { describe, expect, it, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Login Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  it("should be able to make a user login authenticate", async () => {
    await inMemoryUsersRepository.create({
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
      phone: "85988483936",
      role: "ORG",
    });

    const { user } = await sut.execute({
      email: "johndoe@example.com",
      password: "123456",
    });

    expect(user).toEqual(
      expect.objectContaining({
        name: "John Doe",
        email: "johndoe@example.com",
      })
    );
    expect(user.role).toEqual("ORG");
  });

  it("should be not able to make the login authenticate an user with an inexistent email", async () => {
    await inMemoryUsersRepository.create({
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
      phone: "85988483936",
      role: "ORG",
    });

    await expect(() =>
      sut.execute({
        email: "inexistent@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should be not able to make the login authenticate an user with an wrong password", async () => {
    await inMemoryUsersRepository.create({
      email: "johndoe@example.com",
      name: "John Doe",
      password_hash: await hash("123456", 6),
      phone: "85988483936",
      role: "ORG",
    });

    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "wrong-password",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
