import { Org, Role } from "@/generated/prisma";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { hash } from "bcrypt";
import { EmailAlreadyExistsError } from "./errors/email-alredy-exists-error";

interface CreateOrgUseCaseRequest {
  email: string;
  name: string;
  password: string;
  phone: string;
  role: Role;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: InMemoryOrgRepository) {}

  async execute({
    email,
    name,
    password,
    phone,
    role,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {

    const userWithSameEmail = await this.orgRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError();
    }

    const org = await this.orgRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
      phone,
      role,
    });
    

    return {
      org,
    };
  }
}
