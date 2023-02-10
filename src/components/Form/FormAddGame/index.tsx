/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { unrankedGameCreateSchema } from "../../../server/api/schemas/game";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import classNames from "../../../utils/styling";
import Button from "../../Button";
import Typography from "../../Typography";
import FormAutoComplete from "../FormAutoComplete";
import type { TOption } from "../FormListBox";
import FormNumberField from "../FormNumberField";
import FormToggle from "../FormToggle";

type GameCreateInput = RouterInputs["game"]["createUnranked"];
type Props = {
  className?: string;
};

const FormAddGame: React.FC<Props> = ({ className }) => {
  const [isRanked, setIsRanked] = useState(false);
  const methods = useForm<GameCreateInput>({
    resolver: zodResolver(unrankedGameCreateSchema),
  });
  const createUnrankedGame = api.game.createUnranked.useMutation();
  const createRankedGame = api.game.createRanked.useMutation();

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
    if (isRanked) {
      await createRankedGame.mutateAsync(data, {
        onSuccess: () => {
          utils.game.getAll.invalidate();
        },
      });
    } else {
      await createUnrankedGame.mutateAsync(data, {
        onSuccess: () => {
          utils.game.getAll.invalidate();
        },
      });
    }

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
        <FormNumberField
          name="winnerScore"
          label="Winner Score"
          min={0}
          max={99}
        />
        <FormNumberField
          name="loserScore"
          label="Loser Score"
          min={0}
          max={99}
        />
        <FormToggle
          label="Ranked"
          onChange={() => setIsRanked((prev) => !prev)}
        />
        {!!errorMessage && Object.values(errorMessage).length > 0 && (
          <Typography className="border-red-500/80  !text-red-500/80 hover:ring-red-500/50  focus:ring-red-500/80 active:focus:ring-red-500/80">
            {/* {JSON.stringify(errorMessage)} */}
          </Typography>
        )}
        <Button variant="primary" type="submit" className="col-span-2 w-full">
          {createUnrankedGame.isLoading || createRankedGame.isLoading ? (
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
