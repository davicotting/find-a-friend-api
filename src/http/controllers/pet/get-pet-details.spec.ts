import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import { createAndAutheticateUser } from "@/use-cases/utils/test/create-and-authenticate-user";

describe("Get Pet Details (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should get pet details", async () => {
    const city = await prisma.city.create({
      data: {
        name: "DougLand",
        created_at: new Date(),
        id: randomUUID(),
      },
    });

    const { userId } = await createAndAutheticateUser(app, true);
    const pet = await prisma.pet.create({
      data: {
        userId: userId,
        name: "Doug",
        address: "dougLand, avenue 1",
        cityId: city.id,
        petEnergy: 5,
        petEnviroment: "SMALL",
        petSize: "SMALL",
        requirements: ["juice", "female pets"],
        description: "Doug is an artist.",
      },
    });

    const response = await request(app.server).get(`/pet/${pet.id}`);

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        name: "Doug",
      })
    );
  });
});
