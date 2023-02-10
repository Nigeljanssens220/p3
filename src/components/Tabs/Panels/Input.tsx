import { TabsContent } from "..";
import FormAddGame from "../../Form/FormAddGame";
import FormAddPlayer from "../../Form/FormAddPlayer";

const Input: React.FC = ({}) => {
  return (
    <TabsContent value="input" className="w-full">
      <section className="grid gap-4 lg:grid-cols-2">
        <FormAddGame className="hidden lg:block" />
        <FormAddPlayer />
        <FormAddGame className="lg:hidden" />
      </section>
    </TabsContent>
  );
};

export default Input;
