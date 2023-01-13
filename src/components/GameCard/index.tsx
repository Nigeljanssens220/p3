import { CalendarIcon } from "@heroicons/react/20/solid";
import type { GameWithPlayers } from "../types/game";
import Typography from "../Typography";

interface Props {
  data: GameWithPlayers;
}

const GameCard: React.FC<Props> = ({ data }) => {
  const f = new Intl.DateTimeFormat("nl-NL", {
    dateStyle: "medium",
  });

  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter">
      <div className="flex items-center justify-center space-x-4">
        <Typography className="rounded-lg bg-green-500 bg-opacity-20 py-2 px-4 font-semibold">
          {data.Winner.name}{" "}
        </Typography>
        <span className="font-normal italic">vs.</span>
        <Typography className="rounded-lg bg-red-500 bg-opacity-20 py-2 px-4 font-semibold">
          {data.Loser.name}
        </Typography>
      </div>
      <Typography className="rounded-lg bg-white bg-opacity-20 py-2 px-4 font-semibold">
        {data.winnerScore + "-" + data.loserScore}
      </Typography>
      <Typography className="rounded-lg bg-white bg-opacity-20 py-2 px-4 font-semibold">
        {data.ranked ? "Ranked" : "Friendly"}
      </Typography>
      <div className="flex items-center justify-center rounded-lg bg-white bg-opacity-20 px-4 py-2">
        <CalendarIcon className="mr-2 h-5 w-5" />
        <Typography>{f.format(data.createdAt)}</Typography>
      </div>
    </div>
  );
};

export default GameCard;
