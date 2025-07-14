import { City } from "@/generated/prisma";

export interface CityRepository {
    create(name: string): Promise<City>
    findByName(name: string): Promise<City | null>
}