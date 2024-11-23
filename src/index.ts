import Fastify from "fastify";
import { healthzRoute } from "./routes/healthz";
import { playersRoute } from "./routes/players";
import { teamsRoute } from "./routes/teams";
import { matchesRoute } from "./routes/matches";

const app = Fastify({
  logger: import.meta.env.PROD ? false : true,
});

// Healthz endpoint
app.register(healthzRoute, { prefix: "/healthz" });

// Player endpoint
app.register(playersRoute, { prefix: "/players" });

// Teams endpoint
app.register(teamsRoute, { prefix: "/teams" });

// Match endpoint
app.register(matchesRoute, { prefix: "/matches" });

// Startup
if (import.meta.env.PROD) {
  const envPort = import.meta.env.VITE_PORT || process.env.PORT || 8080;
  app.listen({ port: envPort, host: "::" }, function (err, address) {
    if (err) {
      app.log.error(err);
      process.exit(1);
    }
    console.log("Listening on: " + address);
  });
}

// Handle interrupt
process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
  console.log("Closing http server.");
  app.close(() => {
    console.log("Http server closed.");
  });
});

export const viteNodeApp = app;
