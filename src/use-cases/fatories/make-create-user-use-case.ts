import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { CreateUserUseCase } from "../create-user";

export async function MakeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const createUsertUseCase = new CreateUserUseCase(
    usersRepository
  );

  return createUsertUseCase;
}
