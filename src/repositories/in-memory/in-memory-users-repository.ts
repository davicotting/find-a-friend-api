import { Prisma,  User } from "@/generated/prisma";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UsersRepository{
  public items: User[] = [];

  async findByUserId(userId: string) {
    
    const userWithSameId = this.items.find((user) => user.id == userId);

    if (!userWithSameId) {
      return null;
    }

    return userWithSameId;
  }

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      name: data.name,
      role: data.role,
      password_hash: data.password_hash,
      phone: data.phone,
      email: data.email,
      created_at: new Date(),
      id: randomUUID(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(email: string) {
    const userWithSameEmail = this.items.find((user) => user.email == email);

    if (!userWithSameEmail) {
      return null;
    }

    return userWithSameEmail;
  }
}
