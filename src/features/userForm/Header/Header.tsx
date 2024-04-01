import { HandCoins } from "lucide-react";

export const Header = () => (
  <div className="flex flex-row gap-x-4 items-center">
    <HandCoins className="size-10 lg:size-12" />
    <div className="flex-col">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Økonomihjelperen
      </h1>
      <p className="text-sm text-muted-foreground">
        Et verktøy for å hjelpe deg med å urforske din økonomiske horisont
      </p>
    </div>
  </div>
);
