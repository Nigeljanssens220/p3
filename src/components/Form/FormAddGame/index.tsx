/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { gameCreateSchema } from "../../../server/api/schemas/game";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import classNames from "../../../utils/styling";
import Button from "../../Button";
import Typography from "../../Typography";
import FormAutoComplete from "../FormAutoComplete";
import type { TOption } from "../FormListBox";
import FormNumberField from "../FormNumberField";

type GameCreateInput = RouterInputs["game"]["create"];
type Props = {
  className?: string;
};

const FormAddGame: React.FC<Props> = ({ className }) => {
  const methods = useForm<GameCreateInput>({
    resolver: zodResolver(gameCreateSchema),
  });
  const createGame = api.game.create.useMutation();
  const utils = api.useContext();

  const allPlayers = api.player.getAll.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: 0,
  }).data;
  const allPlayersOptions = useMemo(
    () =>
      allPlayers?.map((player) => ({
        value: player.id,
        label: player.name,
      })) as TOption[],
    [allPlayers]
  );

  const createGameHandler = async (data: GameCreateInput) => {
    await createGame.mutateAsync(data, {
      onSuccess: () => {
        utils.game.getAll.invalidate();
      },
    });
    methods.reset();
  };

  const errorMessage = methods.formState.errors;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(createGameHandler)}
        className={classNames(
          className,
          "flex flex-col justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter"
        )}
      >
        <Typography variant="h2" className="text-xl font-semibold text-white">
          Wedstrijd
        </Typography>
        <FormAutoComplete
          options={allPlayersOptions}
          name="winnerId"
          label="Winner"
        />
        <FormAutoComplete
          options={allPlayersOptions}
          name="loserId"
          label="Loser"
        />
        <div className="flex items-center justify-evenly">
          <FormNumberField
            name="winnerScore"
            label="Winner Score"
            min={0}
            max={99}
          />
          <Typography className="mt-5 px-4 text-gray-100 lg:px-10">
            -
          </Typography>
          <FormNumberField
            name="loserScore"
            label="Loser Score"
            min={0}
            max={99}
          />
        </div>
        {!!errorMessage && Object.values(errorMessage).length > 0 && (
          <Typography className="border-red-500/80  !text-red-500/80 hover:ring-red-500/50  focus:ring-red-500/80 active:focus:ring-red-500/80">
            {/* {JSON.stringify(errorMessage)} */}
          </Typography>
        )}
        <Button variant="primary" type="submit" className="col-span-2 w-full">
          {createGame.isLoading ? (
            <Ring size={20} lineWeight={5} speed={2} color="white" />
          ) : (
            "Toevoegen"
          )}
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormAddGame;
