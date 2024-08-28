import { View } from "react-native";
import { useRouter } from "expo-router";
import { RestaurantCard } from "../../../components/RestaurantCard";

export default function RestaurantsPage() {
    const router = useRouter();

    const handlePress = (name: string) => {
        // Du kan også skrive:
        // router.push({
        //     pathname: "/users/[id]",
        //     params: {id: name},
        // })
        router.push(`/restaurants/${name}`);
    };

    return (
        <View>
            <View className="gap-y-2 mt-2">
                <RestaurantCard className="mx-2" name="KFC" onPress={() => handlePress("KFC")} />
                <RestaurantCard className="mx-2" name="Riz Raz" onPress={() => handlePress("Riz Raz")} />
            </View>
        </View>
    );
}
