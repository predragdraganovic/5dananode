// import { expect, test } from "vitest";
// import { NewDB } from "../database/db";
// import { NewMatch } from "./match";

// test("creates a new match in empty database", () => {
//   expect(() => {
//     // Creates a new database
//     const DB = NewDB();

//     // Creates a new match
//     NewMatch("1", "2", "1", 1, DB);
//   }).toThrow();
// });

// test("creates a new match in database with players & teams", () => {
//   expect(() => {
//     // Creates a new database
//     const DB = NewDB();

//     // Adds 10 players
//     for (let i = 0; i < 10; i++) {
//       DB.Players.addPlayer(`Player ${i + 1}`);
//     }

//     // Add 2 teams
//     DB.Teams.addTeam("1", ["1", "2", "3", "4", "5"], DB);
//     DB.Teams.addTeam("2", ["6", "7", "8", "9", "10"], DB);

//     // Creates a few matches
//     NewMatch("1", "2", "1", 1, DB);
//     NewMatch("1", "2", "2", 1, DB);
//     NewMatch("1", "2", null, 1, DB);
//   }).not.toThrow();
// });
