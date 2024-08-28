import { View, Text, ViewProps, TouchableOpacity } from "react-native";

interface Props extends ViewProps {
    name: string;
    onPress?: (name: string) => void;
}

export const RestaurantCard = (props: Props) => {
    return (
        <TouchableOpacity onPress={() => props.onPress?.(props.name)}>
            <View {...props} className="bg-red-400 p-4">
                <Text>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
};
