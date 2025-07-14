import { User } from "@/generated/prisma";
import { compare } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { UsersRepository } from "@/repositories/users-repository";

interface CreateUserUseCaseRequest {
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const isAnCorrectlyPassord = await compare(password, user.password_hash);

    if (!isAnCorrectlyPassord) {
      throw new InvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
