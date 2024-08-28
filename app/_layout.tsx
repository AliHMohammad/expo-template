import { Stack } from "expo-router/stack";

// Vi fortæller, at vores root layout består af tabs
export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}
