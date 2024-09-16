import { View, Text, Button, TextInput } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";

export default function RestaurantPage() {
    // Endpoint værdi. Det ID vi har sendt afsted får vi fat i med nedenstående.
    const { id, name } = useLocalSearchParams<{ id: string, name: string }>();
    const [input, setInput] = React.useState(name);
    const [isEditing, setIsEditing] = React.useState(false);

    const handleEdit = () => {
        router.navigate({
            pathname: "/restaurants",
            params: { id: id, name: input },
        });
    };

    return (
        <View className="flex flex-1 justify-center items-center">
            {/* Nedenstående ændrer din header til en dynamisk navn ud fra name */}
            <Stack.Screen
                options={{
                    headerTitle: "Restaurant " + name,
                }}
            />
            <Text className="mb-2">Restaurant page</Text>
            {!isEditing ? (
                <>
                    <Text>Name: {name}</Text>
                    <Button title="Edit" onPress={() => setIsEditing(true)} />
                </>
            ) : (
                <>
                    <TextInput className="border m-3 p-2" value={input} onChangeText={setInput} />
                    <Button title="Edit" onPress={handleEdit} />
                </>
            )}
        </View>
    );
}
