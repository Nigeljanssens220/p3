import { Player } from "@prisma/client";
import Typography from "../Typography";

interface Props {
  data: Player;
}

const PlayerCard: React.FC<Props> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter">
      <div className="flex items-center justify-center space-x-4">
        <Typography className="rounded-lg bg-green-500 bg-opacity-20 py-2 px-4 font-semibold">
          {data.name}
        </Typography>
        <Typography className="rounded-lg bg-red-500 bg-opacity-20 py-2 px-4 font-semibold">
          {data.eloRating}
        </Typography>
      </div>
    </div>
  );
};

export default PlayerCard;
