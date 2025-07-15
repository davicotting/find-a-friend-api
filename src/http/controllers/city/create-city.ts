import { CityAlreadyExistsError } from "@/use-cases/errors/city-already-exists-error";
import { MakeCreateCityUseCase } from "@/use-cases/fatories/make-create-city-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function createCity(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestBodyShema = zod.object({
    name: zod.string().min(1, "Campo obrigatório."),
  });

  const { name } = requestBodyShema.parse(request.body);

  try {
    const makeCreateCityUseCase = await MakeCreateCityUseCase();
    const { city } = await makeCreateCityUseCase.execute({
      name,
    });

    return reply.code(201).send({city});
  } catch (error) {
    if (error instanceof CityAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    return error;
  }
}
