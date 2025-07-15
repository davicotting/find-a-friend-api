import { CityAlreadyExistsError } from "@/use-cases/errors/city-already-exists-error";
import { MakeCreatePetUseCase } from "@/use-cases/fatories/make-create-pet-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const requestBodyShema = zod.object({
    address: zod.string().min(1, "Campo obrigatório."),
    cityId: zod.string().uuid(),
    description: zod.string().optional(),
    name: zod.string().min(1, "Campo obrigatório."),
    petEnergy: zod
      .number()
      .min(1, "Energia minima é 5")
      .max(5, "Energia maxima é 5"),
    petEnviroment: zod.enum(["SMALL", "MEDIUM", "LARGE"]),
    petSize: zod.enum(["SMALL", "MEDIUM", "LARGE"]),
    requirements: zod.array(zod.string()),
  });

  const {
    name,
    address,
    cityId,
    petEnergy,
    petEnviroment,
    petSize,
    requirements,
    description,
  } = requestBodyShema.parse(request.body);

  try {
    const makeCreateCityUseCase = await MakeCreatePetUseCase();
    const { pet } = await makeCreateCityUseCase.execute({
      name,
      address,
      cityId,
      petEnergy,
      petEnviroment,
      petSize,
      requirements,
      description: description ?? null,
      userId: request.user.sub
    });

    return reply
      .code(201)
      .send({ pet });
  } catch (error) {
    if (error instanceof CityAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    return error;
  }
}
