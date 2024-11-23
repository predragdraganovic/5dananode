import { FastifyInstance } from "fastify";
import { DB } from "../../lib/database/db";
import { Team } from "../../lib/types/team";

export async function teamsRoute(app: FastifyInstance) {
  // GET /teams/b909d79d-04d3-442d-9b43-29b2a44cc628
  /*

  Response:
  {
    "id": "b909d79d-04d3-442d-9b43-29b2a44cc628",
    "teamName": "Team1",
    "players": [
        /* players output for each player /*
    ]
  }

  */

  app.get("/:teamId", async (request, reply) => {
    // Get the player ID from the request parameters
    const { teamId } = request.params as { teamId: string };

    let team: Team | null;
    try {
      team = DB.Teams.getTeamById(teamId);
    } catch (error) {
      return error;
    }

    if (team === null) {
      reply.code(404);
      return {};
    }

    return team.getOutput(DB);
  });

  // POST /teams
  /*

  Request:
  {
    "teamName": "Team1",
    "players": [
        "b769b730-d1b9-4a94-8d2d-2936e050722c",
        "34e7a9e7-df16-4082-92d5-cadb8fc087e5",
        "64f6186b-3a39-47b9-9313-3fcb8e4f06fd",
        "187b683c-1255-46a6-a709-60f8af0fd200",
        "f8987880-8869-472c-8335-83f60132b15d"
    ]
  }

  Response:
  {
    "id": "b909d79d-04d3-442d-9b43-29b2a44cc628",
    "teamName": "Team1",
    "players": [
        /* players output for each player /*
    ]
  }

  */

  app.post("/", async (request, reply) => {
    // Get the team name and players ids from the request body
    const { teamName, players } = request.body as {
      teamName: string;
      players: string[];
    };

    let newTeam: Team;
    try {
      newTeam = DB.Teams.addTeam(teamName, players, DB);
    } catch (error) {
      reply.code(400);
      return error;
    }

    return newTeam.getOutput(DB);
  });
}
