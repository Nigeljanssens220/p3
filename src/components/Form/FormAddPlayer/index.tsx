import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { playerCreateSchema } from "../../../server/api/schemas/player";
import type { RouterInputs } from "../../../utils/api";
import { api } from "../../../utils/api";
import Button from "../../Button";
import Typography from "../../Typography";
import FormEmailField from "../FormEmailField";
import FormTextField from "../FormTextField";

type PlayerCreateInput = RouterInputs["player"]["create"];

const FormAddPlayer: React.FC = ({}) => {
  const methods = useForm<PlayerCreateInput>({
    resolver: zodResolver(playerCreateSchema),
  });
  const createPlayer = api.player.create.useMutation();
  const utils = api.useContext();

  const createPlayerHandler = async (data: PlayerCreateInput) => {
    await createPlayer.mutateAsync(data, {
      onSuccess: () => {
        utils.player.getAll.invalidate();
      },
    });
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(createPlayerHandler)}
        className="flex flex-col justify-center space-y-4 rounded-lg bg-gray-100 bg-opacity-25 bg-clip-padding p-4 backdrop-blur-3xl backdrop-filter"
      >
        <Typography variant="h2" className="text-xl font-semibold text-white">
          Speler
        </Typography>
        <FormTextField
          name="name"
          id="name-new-player"
          label="Naam"
          placeholder="e.g. BestPongPlayer69"
        />
        <FormEmailField
          name="email"
          id="email-new-player"
          label="Email"
          placeholder="420@blazeit.com"
        />
        <Button variant="primary" type="submit" className="col-span-2">
          Zoeken
        </Button>
      </form>
    </FormProvider>
  );
};

export default FormAddPlayer;
