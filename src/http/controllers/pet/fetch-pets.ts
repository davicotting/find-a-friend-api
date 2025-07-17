import { CityNotExistsError } from "@/use-cases/errors/city-not-exists-error";
import { MakeFetchPetsUseCase } from "@/use-cases/fatories/make-fetch-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const requestQuerySchema = zod.object({
    cityId: zod.string().uuid(),
    petEnergy: zod.number().min(1).max(5).optional(),
    petEnviroment: zod.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    petSize: zod.enum(["SMALL", "MEDIUM", "LARGE"]).optional(),
    requirements: zod.array(zod.string()).optional(),
  });

  const { cityId, petEnviroment, petSize, requirements, petEnergy } =
    requestQuerySchema.parse(request.query);

  try {
    const makeFetchPetsUseCase = await MakeFetchPetsUseCase();
    const { pets } = await makeFetchPetsUseCase.execute({
      cityId,
      petEnergy,
      petEnviroment,
      petSize,
      requirements,
    });

    return reply.code(200).send(pets);
  } catch (error) {
    if (error instanceof CityNotExistsError) {
      return reply.code(404).send({ message: error.message });
    }
    return error;
  }
}
