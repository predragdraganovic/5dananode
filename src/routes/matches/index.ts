import { FastifyInstance } from "fastify";
import { DB } from "../../lib/database/db";
import { NewMatch } from "../../lib/functions/match";

export async function matchesRoute(app: FastifyInstance) {
  // POST /matches

  /*

    Request:
    {
        "team1Id": "dacfe004-42d8-4938-8e1c-a1fe46739cb6",
        "team2Id": "7265bc21-46bc-40e3-a2d5-3338c8cc7495",
        "winningTeamId": "dacfe004-42d8-4938-8e1c-a1fe46739cb6",
        "duration": 3
    }

    Response:
    200 OK

    */

  app.post("/", async (request, _reply) => {
    const { team1Id, team2Id, winningTeamId, duration } = request.body as {
      team1Id: string;
      team2Id: string;
      winningTeamId: string;
      duration: number;
    };

    try {
      NewMatch(team1Id, team2Id, winningTeamId, duration, DB);
    } catch (error) {
      return error;
    }

    return {};
  });
}
