import { ScrollView, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";
import { RestaurantCard } from "../../../components/RestaurantCard";
import React from "react";

const INIT_DATA = [
    {
        id: 0,
        name: "KFC",
    },
    {
        id: 1,
        name: "Riz Raz",
    },
    {
        id: 2,
        name: "Stefanos",
    },
];

export default function RestaurantsPage() {
    const [restaurants, setRestaurants] = React.useState([...INIT_DATA]);
    const [input, setInput] = React.useState("");
    const router = useRouter();

    const handlePress = (name: string) => {
        // Du kan også skrive:
        // router.push({
        //     pathname: "/users/[id]",
        //     params: {id: name},
        // })
        router.push(`/restaurants/${name}`);
    };

    const handleCreate = () => {
        if (input === "") return;

        setRestaurants((prev) => [...prev, { id: prev.length, name: input }]);
        setInput("");
    };

    return (
        <ScrollView>
            <View>
                <Text className="pt-3 text-center">Create a new restaurant</Text>
                <TextInput returnKeyType="done" className="border p-3 m-3" value={input} onChangeText={setInput} onEndEditing={handleCreate} />
            </View>
            <View className="gap-y-2 mt-2">
                {restaurants.map((r) => (
                    <RestaurantCard key={r.id} className="mx-2" name={r.name} onPress={handlePress} />
                ))}
            </View>
        </ScrollView>
    );
}
