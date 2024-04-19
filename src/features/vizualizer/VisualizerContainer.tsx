import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HTMLAttributes } from "react";

type VisualizerContainerProps = HTMLAttributes<HTMLDivElement>;

export const VisualizerContainer = ({ ...props }: VisualizerContainerProps) => {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Visualizer</CardTitle>
        <CardDescription>This is the visualizer</CardDescription>
      </CardHeader>
      <CardContent>
        <p>this is the content</p>
      </CardContent>
    </Card>
  );
};
