/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { zodResolver } from "@hookform/resolvers/zod";
import { Ring } from "@uiball/loaders";
import debounce from "lodash.debounce";
import { useCallback, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { gameCreateSchema } from "../../../server/api/schemas/game";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import classNames from "../../../utils/styling";
import Button from "../../Button";
import Typography from "../../Typography";
import FormAutoComplete from "../FormAutoComplete";
import { TOption } from "../FormListBox";
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

  const allPlayers = api.player.getAll.useQuery().data;
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

  // use debounce to prevent the search from happening on every keystroke, because the operation is very expensive
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedHandler = useCallback(debounce(createGameHandler, 10000), []);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(debouncedHandler)}
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
          name="winner-player"
          label="Winner"
        />
        <FormAutoComplete
          options={allPlayersOptions}
          name="loser-player"
          label="Loser"
        />
        <div className="flex items-center justify-evenly">
          <FormNumberField name="winner-score" label="Winner Score" />
          <Typography className="mt-5 px-4 text-gray-100 lg:px-0">-</Typography>
          <FormNumberField name="loser-score" label="Loser Score" />
        </div>
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
