import { ActivityIndicator, Button, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { RestaurantCard } from "../../../components/RestaurantCard";
import React from "react";
import { collection } from "firebase/firestore";
import { database } from "../../../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import IRestaurant from "../../../models/Restaurant";
import RestaurantsEndpoint from "../../../services/RestaurantsEndpoint";
import { useStyling } from "../../../contexts/StyleContext";
import { PanGestureHandler, GestureHandlerRootView } from "react-native-gesture-handler";


export default function RestaurantsPage() {
    const router = useRouter();
    const {theme} = useStyling();
    // Konstant, aktiv forbindelse. Returnerer 3 værdier
    const [values, loading, error] = useCollection(collection(database, "restaurants"));
    // Values.docs er dine restaurants, men den har ikke Id på. Dem skal vi sætte på fra firebase.
    const restaurants = values?.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IRestaurant[];

    const handlePress = ({ name, id }: IRestaurant) => {
        // Du kan også skrive:
        // router.push(`/restaurants/${name}`);
        router.push({
            pathname: "/restaurants/[id]",
            params: { id: id, name: name },
        });
    };

    const handleDelete = async (id: string) => {
        await RestaurantsEndpoint.deleteRestaurant(id);
    };

    return (
        <ScrollView className={`${theme.backgroundColor}`}>
            <View className="items-center mt-2">
                <Button onPress={() => router.push("/restaurants/create")} title="Create a new Restaurant" />
            </View>
            <View className="gap-y-2 mt-2">
                {loading ? (
                    <ActivityIndicator size={"large"} />
                ) : (
                    restaurants?.map((r) => (
                        <View className="flex flex-row" key={r.id}>
                            <RestaurantCard className={`mx-2 w-80 ${theme.restaurantCardStyle}`} name={r.name} onPress={() => handlePress(r)} />
                            <TouchableOpacity className="flex justify-center items-center" onPress={() => handleDelete(r.id)}>
                                <Text className={theme.textStyle}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                )}
            </View>
        </ScrollView>
    );
}
