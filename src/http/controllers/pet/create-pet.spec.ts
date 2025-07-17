import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import { createAndAutheticateUser } from "@/use-cases/utils/test/create-and-authenticate-user";

describe("Create Pet (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create an Pet", async () => {
    const city = await prisma.city.create({
      data: {
        name: "DougLand",
        created_at: new Date(),
        id: randomUUID(),
      },
    });

    const { token } = await createAndAutheticateUser(app, true);
    const response = await request(app.server)
      .post("/pet/create")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Doug",
        address: "dougLand, avenue 1",
        cityId: city.id,
        petEnergy: 5,
        petEnviroment: "SMALL",
        petSize: "SMALL",
        requirements: ["juice", "female pets"],
        description: "Doug is an artist.",
      });

    expect(response.statusCode).toEqual(201);

    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: "Doug",
      })
    );
  });
});
