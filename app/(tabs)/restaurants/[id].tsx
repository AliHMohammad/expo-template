import { View, Text } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function RestaurantPage() {
    // Endpoint værdi. Det ID vi har sendt afsted får vi fat i med nedenstående.
	const { id } = useLocalSearchParams<{ id: string }>();
	
    return (
        <View className="flex flex-1 justify-center items-center">
            {/* Nedenstående ændrer din header til en dynamisk navn ud fra id (navn) */}
            <Stack.Screen options={{
                headerTitle: "Restaurant " + id
            }} />
            <Text>Restaurant page</Text>
            <Text>Name: {id}</Text>
        </View>
    );
}
