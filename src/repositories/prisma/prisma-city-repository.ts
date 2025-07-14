import { CityRepository } from "../city-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCityRepository implements CityRepository {
  async create(name: string) {
    const city = await prisma.city.create({
      data: {
        name,
      },
    });

    return city;
  }

  async findById(id: string) {
    const city = await prisma.city.findUnique({ where: { id } });
    return city;
  }

  async findByName(name: string) {
    const city = await prisma.city.findUnique({ where: { name } });

    return city;
  }
}
