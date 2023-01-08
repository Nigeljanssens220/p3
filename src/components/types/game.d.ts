import { Game, Player } from "@prisma/client";

interface GameWithPlayers extends Game {
  Winner: Player;
  Loser: Player;
}
