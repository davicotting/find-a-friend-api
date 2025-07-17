import fastify from "fastify";
import { userRoutes } from "./http/controllers/user/routes";
import fastifyJwt from "@fastify/jwt";
import { fastifyCookie } from "@fastify/cookie"
import { env } from "./env";
import { cityRoutes } from "./http/controllers/city/routes";
import { petRoutes } from "./http/controllers/pet/routes";

export const app = fastify();

app.register(fastifyCookie);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: "10m"
    },
    cookie: {
        cookieName: 'refresh-token',
        signed: false,
    }
})

app.register(userRoutes);
app.register(cityRoutes);
app.register(petRoutes);