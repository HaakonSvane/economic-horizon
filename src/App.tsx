import { SiteHeader } from "./components/SiteHeader";
import { Separator } from "./components/ui/separator";
import { UserFormContainer } from "./features/userForm";
import { VisualizerContainer } from "./features/vizualizer";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <>
      <Analytics />
      <div
        vaul-drawer-wrapper=""
        className="py-8 px-4 lg:px-8 2xl:px-0 max-w-6xl m-auto antialiased bg-background h-[100dvh]"
      >
        <div className="grid gap-8 grid-cols-1">
          <SiteHeader />
          <UserFormContainer />
          <VisualizerContainer />
          <Separator />
          <p>Laget med ❤️ av Haakon Hafsahl svane</p>
        </div>
      </div>
    </>
  );
};

export default App;
