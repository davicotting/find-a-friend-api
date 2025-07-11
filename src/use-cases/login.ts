import { Org, Role } from "@/generated/prisma";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { compare, hash } from "bcrypt";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

interface CreateOrgUseCaseRequest {
  email: string;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class LoginUseCase {
  constructor(private orgRepository: InMemoryOrgRepository) {}

  async execute({
    email,
    password,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgRepository.findByEmail(email);

    if (!org) {
      throw new InvalidCredentialsError();
    }

    const isAnCorrectlyPassord = await compare(password, org.password_hash);

    if (!isAnCorrectlyPassord) {
      throw new InvalidCredentialsError();
    }

    return {
      org,
    };
  }
}
