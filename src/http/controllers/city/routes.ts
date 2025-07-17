import {  } from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { createCity } from "./create-city";

export function cityRoutes(app: FastifyInstance){
    app.post('/city/create', createCity);
}