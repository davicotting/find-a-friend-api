import { Prisma } from "@/generated/prisma";
import { UsersRepository } from "../users-repository";
import { prisma } from "@/lib/prisma";
export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        ...data,
      },
    });

    return user;
  }
  async findByEmail(email: string) {
    const findedUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return findedUser;
  }
  async findByUserId(userId: string) {
    const findedUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return findedUser;
  }
}
