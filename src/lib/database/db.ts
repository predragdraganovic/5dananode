import { Database } from "../types/database";
import { Players } from "../types/player";
import { Teams } from "../types/team";

export function NewDB(): Database {
  return {
    Players: new Players(),
    Teams: new Teams(),
  };
}

export const DB: Database = NewDB();
