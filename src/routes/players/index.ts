import { FastifyInstance } from "fastify";
import { DB } from "../../lib/database/db";
import { Player } from "../../lib/types/player";

export async function playersRoute(app: FastifyInstance) {
  // GET /players/b769b730-d1b9-4a94-8d2d-2936e050722c
  /*

  Response:
  {
      "id": "b769b730-d1b9-4a94-8d2d-2936e050722c",
      "nickname": "Player1",
      "wins": 0,
      "losses": 0,
      "elo": 0,
      "hoursPlayed": 0,
      "teamId": "b909d79d-04d3-442d-9b43-29b2a44cc628",
      "ratingAdjustment": 50
  }

  */

  app.get("/:playerId", async (request, reply) => {
    // Get the player ID from the request parameters
    const { playerId } = request.params as { playerId: string };

    let player: Player | null;
    try {
      player = DB.Players.getPlayerById(playerId);
    } catch (error) {
      return error;
    }

    if (player === null) {
      reply.code(404);
      return {};
    }

    return player.getOutput();
  });

  // GET /players - TODO: ??? Not defined in PDF, but has to return 200 OK in tests...
  app.get("/", async (_request, _reply) => {
    return {};
  });

  // POST /players/create
  /*

  Request:
  {
      "nickname": "Player1" // unique
  }

  Response:
  {
      "id": "b769b730-d1b9-4a94-8d2d-2936e050722c",
      "nickname": "Player1",
      "wins": 0,
      "losses": 0,
      "elo": 0,
      "hoursPlayed": 0,
      "team": null,
      "ratingAdjustment": null // TODO: Sus
  }

  */

  app.post("/create", async (request, reply) => {
    // Get the nickname from the request body
    const { nickname } = request.body as { nickname: string };

    let newPlayer: Player;
    try {
      newPlayer = DB.Players.addPlayer(nickname);
    } catch (error) {
      reply.code(400);
      return error;
    }

    // TODO: Is this correct? It's how it's shown in the PDF...
    let resp = newPlayer.getOutput();
    resp.ratingAdjustment = null;
    return resp;
  });
}
