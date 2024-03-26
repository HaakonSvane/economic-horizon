import { UserFormContainer } from "./features/userForm";
import { VisualizerContainer } from "./features/vizualizer";

const App = () => {
  return <div className="py-8 px-4 lg:px-8 2xl:px-0 max-w-2xl m-auto">
    <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
      <UserFormContainer />
      <VisualizerContainer />
    </div>
  </div>;
};

export default App;
