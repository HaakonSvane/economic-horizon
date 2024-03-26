import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const VisualizerContainer = () => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>
                Visualizer
            </CardTitle>
            <CardDescription>
                This is the visualizer
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p>this is the content</p>
        </CardContent>
        </Card>
    )
}