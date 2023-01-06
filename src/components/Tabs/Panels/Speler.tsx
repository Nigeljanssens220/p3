import { api } from "../../../utils/api";
import Button from "../../Button";

const Speler: React.FC = ({}) => {
  const createPlayer = api.player.create.useMutation();

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* <TextField /> */}
      <Button variant="primary" onClick={createPlayerHandler}>
        Toevoegen
      </Button>
    </div>
  );
};

export default Speler;
