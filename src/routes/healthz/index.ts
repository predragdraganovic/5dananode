import { FastifyInstance } from "fastify";

export async function healthzRoute(app: FastifyInstance) {
  app.get("/", async (_request, _reply) => {
    return "OK";
  });
}
