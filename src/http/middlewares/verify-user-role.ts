import { FastifyReply, FastifyRequest } from "fastify";

export function VerifyUserRole(roleToVerify: "ORG" | "USER") {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const { role } = request.user;

    if (roleToVerify !== role) {
      reply.code(403).send("Unauthorized");
    }
  };
}
