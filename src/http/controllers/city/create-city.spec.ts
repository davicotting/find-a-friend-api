import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Authenticate (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should autheticate user", async () => {
    const response = await request(app.server).post("/city/create").send({
      name: "Fortaleza",
    });

    expect(response.statusCode).toEqual(201);
  });
});
