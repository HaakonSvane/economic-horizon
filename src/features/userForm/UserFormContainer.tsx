import { Separator } from "@/components/ui/separator";
import { BaseForm } from "./BaseForm";
import { HandCoins } from "lucide-react";

export const UserFormContainer = () => {
  return (
    <div className="flex-col">
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
      <Separator className="mt-2 mb-4" />
      <BaseForm />
    </div>
  );
};
