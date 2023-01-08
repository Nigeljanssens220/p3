import { api } from "../../../utils/api";
import GameCard from "../../GameCard";
import { GameWithPlayers } from "../../types/game";

const Wedstrijden: React.FC = ({}) => {
  const { data, isLoading, isError, error } = api.game.getAll.useQuery();

  return (
    <section className="flex w-full flex-col space-y-4 text-gray-100">
      {data?.map((game) => (
        <GameCard key={game.id} data={game as GameWithPlayers} />
      ))}
    </section>
  );
};

export default Wedstrijden;
