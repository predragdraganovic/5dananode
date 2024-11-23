import { Database } from "../types/database";

export function NewMatch(
  team1Id: string,
  team2Id: string,
  winningTeamId: string | null,
  duration: number,
  db: Database
) {
  // Check if the team IDs are not empty string
  if (team1Id === "" || team2Id === "") {
    throw new Error("Team IDs cannot be empty");
  }

  // Check if the team IDs are the same
  if (team1Id === team2Id) {
    throw new Error("Team IDs must be different");
  }

  // Check if the winning team ID is not one of the team IDs or null
  if (
    winningTeamId !== null &&
    winningTeamId !== team1Id &&
    winningTeamId !== team2Id
  ) {
    throw new Error("Winning team ID must be one of the team IDs or null");
  }

  // Check if the duration is a whole positive number at least 1
  if (duration < 1 || !Number.isInteger(duration)) {
    throw new Error("Duration must be a whole positive number at least 1");
  }

  // Check if both teams exist
  if (db.Teams.getTeamById(team1Id) === null) {
    throw new Error("Team 1 not found");
  }

  if (db.Teams.getTeamById(team2Id) === null) {
    throw new Error("Team 2 not found");
  }

  // Add the duration to all players from both teams
  db.Teams.getTeamById(team1Id)
    ?.getPlayers()
    .forEach((id) => {
      db.Players.getPlayerById(id)?.addHoursPlayed(duration);
    });

  db.Teams.getTeamById(team2Id)
    ?.getPlayers()
    .forEach((id) => {
      db.Players.getPlayerById(id)?.addHoursPlayed(duration);
    });

  // Add wins and losses to the teams' players
  if (winningTeamId !== null) {
    db.Teams.getTeamById(winningTeamId)
      ?.getPlayers()
      .forEach((id) => {
        db.Players.getPlayerById(id)?.addWin();
      });

    const losingTeamId = winningTeamId === team1Id ? team2Id : team1Id;
    db.Teams.getTeamById(losingTeamId)
      ?.getPlayers()
      .forEach((id) => {
        db.Players.getPlayerById(id)?.addLoss();
      });
  }

  // Calculate the average ELO of both teams
  const team1EloAvg =
    db.Teams.getTeamById(team1Id)
      ?.getPlayers()
      .reduce((acc, id) => acc + db.Players.getPlayerById(id)?.getElo()!, 0)! /
    db.Teams.getTeamById(team1Id)?.getPlayers().length!;

  const team2EloAvg =
    db.Teams.getTeamById(team2Id)
      ?.getPlayers()
      .reduce((acc, id) => acc + db.Players.getPlayerById(id)?.getElo()!, 0)! /
    db.Teams.getTeamById(team2Id)?.getPlayers().length!;

  // Recalculate the ELO of all players from both teams
  db.Teams.getTeamById(team1Id)
    ?.getPlayers()
    .forEach((id) =>
      db.Players.getPlayerById(id)?.calculateEloChange(
        team2EloAvg,
        winningTeamId === team1Id
          ? "win"
          : winningTeamId === team2Id
          ? "loss"
          : "draw"
      )
    );

  db.Teams.getTeamById(team2Id)
    ?.getPlayers()
    .forEach((id) =>
      db.Players.getPlayerById(id)?.calculateEloChange(
        team1EloAvg,
        winningTeamId === team2Id
          ? "win"
          : winningTeamId === team1Id
          ? "loss"
          : "draw"
      )
    );
}
