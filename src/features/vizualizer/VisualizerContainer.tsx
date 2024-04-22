import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HTMLAttributes } from "react";
import { StackedAreaGraph } from "./overview/StackedAreaGraph";

type VisualizerContainerProps = HTMLAttributes<HTMLDivElement>;

export const VisualizerContainer = ({ ...props }: VisualizerContainerProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Visualizer</CardTitle>
        <CardDescription>This is the visualizer</CardDescription>
      </CardHeader>
      <CardContent>
        <StackedAreaGraph />
      </CardContent>
    </Card>
  );
};
