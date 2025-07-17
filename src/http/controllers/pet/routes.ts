import { FastifyInstance } from "fastify";
import { createPet } from "./create-pet";
import { VerifyJWT } from "@/http/middlewares/verify-jwt";
import { VerifyUserRole } from "@/http/middlewares/verify-user-role";
import { getPetDetails } from "./get-pet-details";
import { fetchPets } from "./fetch-pets";

export function petRoutes(app: FastifyInstance) {
  app.get("/pet/:id", getPetDetails);
  app.get("/pet/fetch", fetchPets);

  /* Rotas protegidas */
  app.post(
    "/pet/create",
    { onRequest: [VerifyJWT, VerifyUserRole("ORG")] },
    createPet
  );
}
