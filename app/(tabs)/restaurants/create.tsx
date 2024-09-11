import { View, Text, TextInput, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

export default function CreateRestaurantPage() {
    const [input, setInput] = React.useState("");
    const router = useRouter();

    const onCreate = () => {
        // Vi navigerer tilbage til restaurants, hvor vores state er.
        // Vi sender input tilbage som param "name"
        router.navigate({
            pathname: "/restaurants",
            params: { name: input }
        })
    }

    return (
        <View>
            <Text className="pt-3 text-center">Create a new restaurant</Text>
            <TextInput returnKeyType="done" className="border p-3 m-3" value={input} onChangeText={setInput} />
            <Button title="Submit" onPress={onCreate} />
        </View>
    );
}
