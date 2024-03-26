import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const UserFormContainer = () => {
    return (
    <Card>
        <CardHeader>
            <CardTitle>
                User form
            </CardTitle>
            <CardDescription>
                This is the user form
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p>this is the content</p>
        </CardContent>
    </Card>
    )
}