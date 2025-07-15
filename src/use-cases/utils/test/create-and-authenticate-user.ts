import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { hash } from "bcrypt";
import request from "supertest";

export async function createAndAutheticateUser(app: FastifyInstance, isAnAdmin = false) {
  const email = "johndoe@example.com";
  const password = "123456";

  const user = await prisma.user.create({
    data: {
      email: email,
      password_hash: await hash(password, 6),
      name: "John Doe",
      phone: "0000000000",
      role: isAnAdmin === false ? "USER" : "ORG",
    },
  });

  const authenticate = await request(app.server)
    .patch("/user/authenticate")
    .send({
      email,
      password
    });

  const { token } = authenticate.body;

  return {
    token,
    userId: user.id,
  };
}
