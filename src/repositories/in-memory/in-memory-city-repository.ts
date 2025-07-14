import { City, Prisma } from "@/generated/prisma";
import { CityRepository } from "../city-repository";
import { randomUUID } from "crypto";

export class InMemoryCityRepository implements CityRepository {
  public cities: City[] = [];

  async create(name: string) {
    const city: City = {
      name,
      created_at: new Date(),
      id: randomUUID(),
    };

    this.cities.push(city);

    return city;
  }

  async findByName(name: string) {
      const city = this.cities.find((city) => city.name == name);

      if(!city){
        return null;
      }

      return city;
  }
}
