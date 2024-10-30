import { Stack } from "expo-router/stack";
import StyleProvider from "../contexts/StyleContext";

// Vi fortæller, at vores root layout består af tabs
export default function RootLayout() {
    return (
        <StyleProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
        </StyleProvider>
    );
}
