import { EmailAlreadyExistsError } from "@/use-cases/errors/email-alredy-exists-error";
import { MakeCreateUserUseCase } from "@/use-cases/fatories/make-create-user-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const requestBodyShema = zod.object({
    email: zod.string().email("Informe um e-mail válido."),
    password: zod
      .string()
      .min(6, "O campo deve conter no mínimo 6 caracteres."),
    name: zod.string().min(1, "Campo obrigatório."),
    phone: zod
      .string()
      .min(10, "O telefone deve ter pelo menos 10 dígitos.")
      .max(11, "O telefone não pode ter mais de 11 dígitos."),
    role: zod.enum(["ORG", "USER"]),
  });

  const { email, name, password, phone, role } = requestBodyShema.parse(
    request.body
  );

  try {
    const makeCreateUserUseCase = await MakeCreateUserUseCase();
    await makeCreateUserUseCase.execute({
      email,
      name,
      password,
      phone,
      role,
    });
  } catch (error) {
    if (error instanceof EmailAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    return error;
  }

  return reply.code(201).send();
}
