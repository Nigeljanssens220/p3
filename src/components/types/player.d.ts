import { Game, Player } from "@prisma/client";

interface PlayerWithGames extends Player {
  GamesWon: Game[];
  GamesLost: Game[];
}
