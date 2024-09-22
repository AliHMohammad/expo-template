import { Button, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";

export default function ImagesPage() {
    const [imagePath, setImagePath] = React.useState("");

    const handleClick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true
        })

        if (result.canceled) {
            console.log("User clicked on cancel");
            return;
        }

        setImagePath(result.assets[0].uri)
    } 

    return (
        <View className="flex flex-1 justify-center items-center">
            {imagePath && <Image className="w-72 h-72" source={{ uri: imagePath }} />}
            <Button onPress={handleClick} title="Pick image" />
        </View>
    );
}

