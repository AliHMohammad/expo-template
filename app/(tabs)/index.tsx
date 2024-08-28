import { Text, View } from "react-native";
import { Counter } from "../../components/Counter";

export default function Home() {
    return (
        <View className="flex flex-1 justify-center items-center">
            <Text className="text-green-500">Home page!</Text>
        </View>
    );
}
