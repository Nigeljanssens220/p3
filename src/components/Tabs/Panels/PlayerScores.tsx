import { FaceFrownIcon, FaceSmileIcon } from "@heroicons/react/20/solid";
import { TabsContent } from "..";
import { api } from "../../../utils/api";
import classNames from "../../../utils/styling";
import Typography from "../../Typography";

const PlayerScores: React.FC = ({}) => {
  const allPlayers = api.player.getAll.useQuery().data;

  return (
    <TabsContent value="playerScore" className="max-w-sm">
      <section className=" flex w-full max-w-sm flex-col gap-4 space-y-2 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 px-20 text-gray-100 backdrop-blur-3xl backdrop-filter">
        <ul className="list-decimal divide-y">
          {allPlayers &&
            allPlayers.map((player, idx) => {
              const iconClassName =
                idx === 0
                  ? "text-yellow-400"
                  : idx === 1
                  ? "text-gray-400"
                  : idx === 2
                  ? "text-red-400"
                  : "";

              return (
                <li key={player.id}>
                  <div className="relative grid grid-cols-2 items-center gap-8 ">
                    {!!iconClassName && (
                      <FaceSmileIcon
                        className={classNames(
                          iconClassName,
                          "absolute -left-14 h-5 w-5"
                        )}
                      />
                    )}
                    {allPlayers.length === idx + 1 && (
                      <FaceFrownIcon className="absolute -left-14 h-5 w-5 text-red-900" />
                    )}
                    <Typography>{player.name}</Typography>
                    <Typography>{player.eloRating}</Typography>
                  </div>
                </li>
              );
            })}
        </ul>
      </section>
    </TabsContent>
  );
};

export default PlayerScores;
