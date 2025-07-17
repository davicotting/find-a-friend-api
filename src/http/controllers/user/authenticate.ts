import { EmailAlreadyExistsError } from "@/use-cases/errors/email-alredy-exists-error";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { MakeAuthenticateUseCase } from "@/use-cases/fatories/make-authenticate-use-case";
import { MakeCreateUserUseCase } from "@/use-cases/fatories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const requestBodyShema = zod.object({
    email: zod.string().email("Informe um e-mail válido."),
    password: zod
      .string()
      .min(6, "O campo deve conter no mínimo 6 caracteres."),
  });

  const { email, password } = requestBodyShema.parse(request.body);

  try {
    const makeAuthenticateUseCase = await MakeAuthenticateUseCase();
    const { user } = await makeAuthenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "10m",
        },
      }
    );

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: "7d",
        },
      }
    );

    return reply
      .code(200)
      .setCookie("refresh-token", refreshToken)
      .send({ token });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.code(401).send({ message: error.message });
    }
    return error;
  }
}
