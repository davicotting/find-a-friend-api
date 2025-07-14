import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";
import { AuthenticateUseCase } from "../authenticate";

export async function MakeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();
  const autheticateUseCase = new AuthenticateUseCase(usersRepository);

  return autheticateUseCase;
}
