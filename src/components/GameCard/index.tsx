import type { GameWithPlayers } from "../types/game";

interface Props {
  data: GameWithPlayers;
}

const GameCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex items-center justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter">
      {JSON.stringify(data)}
    </div>
  );
};

export default GameCard;
