import { CityAlreadyExistsError } from "@/use-cases/errors/city-already-exists-error";
import { MakeCreateCityUseCase } from "@/use-cases/fatories/make-create-city-use-case";
import { MakeCreatePetUseCase } from "@/use-cases/fatories/make-create-pet-use-case";
import { MakeGetPetDeailsUseCase } from "@/use-cases/fatories/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import * as zod from "zod";

export async function getPetDetails(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const requestBodyShema = zod.object({
    id: zod.string().uuid(),
  });

  const { id } = requestBodyShema.parse(request.params);

  try {
    const makePetPetDetails = await MakeGetPetDeailsUseCase();
    const { pet } = await makePetPetDetails.execute({
      id,
    });

    return reply.code(200).send(pet);
  } catch (error) {
    if (error instanceof CityAlreadyExistsError) {
      return reply.code(409).send({ message: error.message });
    }
    return error;
  }
}
