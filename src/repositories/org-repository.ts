import { Org, Prisma } from "@/generated/prisma";

export interface OrgRepository {
    create(data: Prisma.OrgCreateInput): Promise<Org>
    findByEmail(email: string): Promise<Org | null>
}