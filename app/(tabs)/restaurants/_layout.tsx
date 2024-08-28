import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Restaurants",
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: "Restaurant Details",
                }}
            />
        </Stack>
    );
}
