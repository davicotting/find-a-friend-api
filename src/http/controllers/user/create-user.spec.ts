import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("Create User (E2E)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should create an user", async () => {
    const response = await request(app.server).post("/user/create").send({
      email: "johndoe@example.com",
      password: "123456",
      name: "John Doe",
      phone: "0000000000",
      role: "ORG",
    });

    expect(response.statusCode).toEqual(201)
  });
});
