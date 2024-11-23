import { randomUUID } from "crypto";

export class Player {
  #id: string;
  #nickname: string;
  #wins: number;
  #losses: number;
  #elo: number;
  #hoursPlayed: number;
  #team: string | null;

  constructor(nickname: string) {
    // Check if the nickname is empty string
    if (nickname === "") {
      throw new Error("Nickname cannot be empty");
    }

    this.#id = randomUUID();
    this.#nickname = nickname;
    this.#wins = 0;
    this.#losses = 0;
    this.#elo = 0;
    this.#hoursPlayed = 0;
    this.#team = null;
  }

  getId(): string {
    return this.#id;
  }

  getNickname(): string {
    return this.#nickname;
  }

  getTeam(): string | null {
    return this.#team;
  }

  setTeam(teamId: string) {
    if (teamId === "") {
      throw new Error("Team id cannot be empty");
    }

    if (this.#team !== null) {
      throw new Error("Player is already in a team");
    }

    this.#team = teamId;
  }

  addWin() {
    this.#wins++;
  }

  addLoss() {
    this.#losses++;
  }

  getElo(): number {
    return this.#elo;
  }

  calculateEloChange(opponentElo: number, result: "win" | "loss" | "draw") {
    const expectedScore =
      1 / (1 + Math.pow(10, (opponentElo - this.#elo) / 400));

    if (result === "win") {
      this.#elo += this.#ratingAdjustment() * (1 - expectedScore);
    } else if (result === "loss") {
      this.#elo += this.#ratingAdjustment() * (0 - expectedScore);
    } else {
      this.#elo += this.#ratingAdjustment() * (0.5 - expectedScore);
    }
  }

  addHoursPlayed(hours: number) {
    if (hours < 0) {
      throw new Error("Hours played cannot be negative");
    }

    this.#hoursPlayed += hours;
  }

  #ratingAdjustment(): number {
    // TODO: Check if return null when player has no hours played
    if (this.#hoursPlayed < 500) return 50;
    if (this.#hoursPlayed < 1000) return 40;
    if (this.#hoursPlayed < 3000) return 30;
    if (this.#hoursPlayed < 5000) return 20;
    return 10; // 5000+
  }

  getOutput(): {
    id: string;
    nickname: string;
    wins: number;
    losses: number;
    elo: number;
    hoursPlayed: number;
    team: string | null;
    ratingAdjustment: number | null;
  } {
    return {
      id: this.#id,
      nickname: this.#nickname,
      wins: this.#wins,
      losses: this.#losses,
      elo: this.#elo,
      hoursPlayed: this.#hoursPlayed,
      team: this.#team,
      ratingAdjustment: this.#ratingAdjustment(),
    };
  }
}

export class Players {
  #players: Player[];

  constructor() {
    this.#players = [];
  }

  addPlayer(nickname: string): Player {
    // Check if the nickname is already taken
    if (this.#players.some((player) => player.getNickname() === nickname)) {
      throw new Error("Nickname already taken");
    }

    const newPlayer = new Player(nickname);
    // Check if the player id is already taken
    if (this.#players.some((player) => player.getId() === newPlayer.getId())) {
      throw new Error("Player id already taken");
    }

    this.#players.push(newPlayer);
    return newPlayer;
  }

  getPlayerById(id: string): Player | null {
    return this.#players.find((player) => player.getId() === id) ?? null;
  }
}
