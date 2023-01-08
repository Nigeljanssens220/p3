import { DotSpinner } from "@uiball/loaders";
import { api } from "../../../utils/api";
import GameCard from "../../GameCard";
import { GameWithPlayers } from "../../types/game";

const Wedstrijden: React.FC = ({}) => {
  const { data, isLoading, isError, error } = api.game.getAll.useQuery();

  return (
    <section className="grid w-full gap-4 text-gray-100 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isLoading && (
        <div className="col-span-4 flex items-center justify-center">
          <DotSpinner color="white" />
        </div>
      )}
      {data?.map((game) => (
        <GameCard key={game.id} data={game as GameWithPlayers} />
      ))}
    </section>
  );
};

export default Wedstrijden;
