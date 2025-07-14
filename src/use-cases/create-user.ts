import { User, Role } from "@/generated/prisma";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcrypt";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";
import { UsersRepository } from "@/repositories/users-repository";

interface CreateUserUseCaseRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: Role;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: UsersRepository) {}

  async execute({
    email,
    name,
    password,
    phone,
    role,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.orgRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.orgRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
      phone,
      role,
    });

    return {
      user,
    };
  }
}
