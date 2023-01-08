import { api } from "../utils/api";

const prefetchAllPlayers = async () => {
  const utils = api.useContext();

  const players = await utils.player.getAll.prefetch();
};

export default prefetchAllPlayers;
