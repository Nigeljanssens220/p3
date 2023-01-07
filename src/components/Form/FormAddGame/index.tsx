/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { gameCreateSchema } from "../../../server/api/schemas/game";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import Button from "../../Button";
import Typography from "../../Typography";
import FormAutoComplete, { TOption } from "../FormAutoComplete";

type GameCreateInput = RouterInputs["game"]["create"];

const FormAddGame: React.FC = ({}) => {
  const methods = useForm<GameCreateInput>({
    resolver: zodResolver(gameCreateSchema),
  });
  const createGame = api.game.create.useMutation();
  const utils = api.useContext();

  const allPlayers = api.player.getAll.useQuery().data;
  const allPlayersOptions = useMemo(
    () =>
      allPlayers?.map((player) => ({
        value: player.id,
        label: player.name,
      })) as TOption[],
    [allPlayers]
  );

  console.log(allPlayersOptions);

  const createGameHandler = async (data: GameCreateInput) => {
    await createGame.mutateAsync(data, {
      onSuccess: () => {
        utils.game.getAll.invalidate();
      },
    });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(createGameHandler)}
        className="flex flex-col justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter"
      >
        <Typography variant="h2" className="text-xl font-semibold text-white">
          Wedstrijd
        </Typography>
        {!!allPlayersOptions && (
          <>
            <FormAutoComplete
              options={allPlayersOptions}
              name="winner-player"
              label="Winner"
            />
            <FormAutoComplete
              options={allPlayersOptions}
              name="loser-player"
              label="Loser"
            />
          </>
        )}

        <Button variant="primary" type="submit" className="col-span-2">
          Toevoegen
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormAddGame;
