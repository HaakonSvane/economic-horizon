import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BaseFormContent } from "./BaseFormContent";
import { useStore } from "@/lib/store";
import { useCallback } from "react";
import { BaseFormSchema } from "./types";

export const BaseForm = () => {
  const setBaseInfo = useStore((state) => state.setBaseInfo);

  const onSubmit = useCallback(
    (data: BaseFormSchema) => {
      setBaseInfo(data);
    },
    [setBaseInfo]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Litt grunnleggende...</CardTitle>
        <CardDescription>
          Her fyller du ut litt grunnleggende informasjon om din økonomi
        </CardDescription>
      </CardHeader>
      <CardContent>
        <BaseFormContent onSubmit={onSubmit} />
      </CardContent>
    </Card>
  );
};
