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
    await request(app.server).post("/user/create").send({
      email: "johndoe@example.com",
      password: "123456",
      name: "John Doe",
      phone: "0000000000",
      role: "ORG",
    });

    const response = await request(app.server)
      .patch("/user/authenticate")
      .send({
        email: "johndoe@example.com",
        password: "123456",
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(expect.objectContaining({
        token: expect.any(String)
    }))
  });
});
