import { Prisma, Org } from "@/generated/prisma";
import { OrgRepository } from "../org-repository";
import { randomUUID } from "node:crypto";
import { hash } from "bcrypt";

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      name: data.name,
      role: data.role,
      password_hash: data.password_hash,
      phone: data.phone,
      email: data.email,
      created_at: new Date(),
      id: randomUUID(),
    };

    this.items.push(org);

    return org;
  }

  async findByEmail(email: string) {
    const orgWithSameEmail = this.items.find((org) => org.email == email);

    if (!orgWithSameEmail) {
      return null;
    }

    return orgWithSameEmail;
  }
}
