import FormAddGame from "../../Form/FormAddGame";
import FormAddPlayer from "../../Form/FormAddPlayer";

const Invoer: React.FC = ({}) => {
  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <FormAddGame />
      <FormAddPlayer />
    </section>
  );
};

export default Invoer;
