import { randomUUID } from "crypto";
import { Database } from "./database";

export class Team {
  #id: string;
  #teamName: string;
  #players: string[];

  constructor(teamName: string, players: string[], db: Database) {
    // Check if the teamName is empty string
    if (teamName === "") {
      throw new Error("Team name cannot be empty");
    }

    // Check if the players array length isn't 5
    if (players.length !== 5) {
      throw new Error("Team must have 5 players");
    }

    // Check if the players array has any empty string
    if (players.some((id) => id === "")) {
      throw new Error("Player id cannot be empty");
    }

    // Check if the players array has any duplicate id
    if (new Set(players).size !== players.length) {
      throw new Error("Player id cannot be duplicated");
    }

    // Check if all the players can be found by their id
    if (players.some((id) => db.Players.getPlayerById(id)) === null) {
      throw new Error("Player id not found");
    }

    // Check if all the players are not in any team
    if (
      players.some((id) => db.Players.getPlayerById(id)?.getTeam() !== null)
    ) {
      throw new Error("Player is already in a team");
    }

    const teamId = randomUUID();

    // Set the team ID for all the players
    players.forEach((id) => {
      db.Players.getPlayerById(id)?.setTeam(teamId);
    });

    this.#id = teamId;
    this.#teamName = teamName;
    this.#players = players;
  }

  getId(): string {
    return this.#id;
  }

  getTeamName(): string {
    return this.#teamName;
  }

  getPlayers(): string[] {
    return this.#players;
  }

  getOutput(db: Database): {
    id: string;
    teamName: string;
    players: (
      | {
          id: string;
          nickname: string;
          wins: number;
          losses: number;
          elo: number;
          hoursPlayed: number;
          team: string | null;
          ratingAdjustment: number | null;
        }
      | undefined
    )[];
  } {
    return {
      id: this.#id,
      teamName: this.#teamName,
      players: this.#players.map((id) =>
        db.Players.getPlayerById(id)?.getOutput()
      ),
    };
  }
}

export class Teams {
  #teams: Team[];

  constructor() {
    this.#teams = [];
  }

  addTeam(teamName: string, players: string[], db: Database): Team {
    // Check if the team name is already taken
    if (this.#teams.some((team) => team.getTeamName() === teamName)) {
      throw new Error("Team name already taken");
    }

    const newTeam = new Team(teamName, players, db);
    // Check if the team id is already taken
    if (this.#teams.some((team) => team.getId() === newTeam.getId())) {
      throw new Error("Team id already taken");
    }

    this.#teams.push(newTeam);
    return newTeam;
  }

  getTeamById(id: string): Team | null {
    return this.#teams.find((team) => team.getId() === id) ?? null;
  }
}
