import { Button, ScrollView, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { RestaurantCard } from "../../../components/RestaurantCard";
import React, { useEffect } from "react";

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
    const { name, edited } = useLocalSearchParams<{ name: string; edited: string }>();
    const router = useRouter();

    useEffect(() => {
        // Hvis edited og name er defineret, så skal usestate hooken opdateres
        //! Nedenstående if er fordi vi laver ændringen lokalt. Normalt ville du ændre i db.
        if (edited && name) {
            setRestaurants((prev) => prev.map((r) => (r.name === name ? { ...r, name: edited } : r)));
        }

        // Vi sender name tilbage som param fra create.tsx
        // Derfor skal der ske noget hvis name param er defineret her. Usestate skal opdateres og trigger et rerender
        if (name && !edited) {
            setRestaurants((prev) => [...prev, { id: prev.length, name: name }]);
        }
    }, [name, edited]);

    const handlePress = (name: string) => {
        // Du kan også skrive:
        // router.push({
        //     pathname: "/users/[id]",
        //     params: {id: name},
        // })
        router.push(`/restaurants/${name}`);
    };

    return (
        <ScrollView>
            <View className="items-center mt-2">
                <Button onPress={() => router.push("/restaurants/create")} title="Create a new Restaurant" />
            </View>
            <View className="gap-y-2 mt-2">
                {restaurants.map((r) => (
                    <RestaurantCard key={r.id} className="mx-2" name={r.name} onPress={handlePress} />
                ))}
            </View>
        </ScrollView>
    );
}
