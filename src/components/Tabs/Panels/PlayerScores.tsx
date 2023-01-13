import { api } from "../../../utils/api";
import PlayerCard from "../../PlayerCard";

const PlayerScores: React.FC = ({}) => {
  const allPlayers = api.player.getAll.useQuery().data;

  return (
    <section className="grid w-full gap-4 text-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <>
        {allPlayers &&
          allPlayers.map((player) => (
            <PlayerCard key={player.id} data={player} />
          ))}
      </>
    </section>
  );
};

export default PlayerScores;
