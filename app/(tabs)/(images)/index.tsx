import { Button, Image, View } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

    const handleUpload = async () => {
        const res = await fetch(imagePath);
        const blob = await res.blob();
        const storageRef = ref(storage, `image_ali`);

        await uploadBytes(storageRef, blob)

        alert("Image uploaded!");
        setImagePath("");
    }

    const handleDownload = async () => {
        getDownloadURL(ref(storage, `image_ali`))
            .then((url) => setImagePath(url))
            .catch(() => alert("Something went wrong downloading image"))
    }

    return (
        <View className="flex flex-1 items-center">
            {imagePath && (
                <View className="mt-5">
                    <Image className="w-72 h-72" source={{ uri: imagePath }} />
                    <Button onPress={handleUpload} title="Upload to Firebase Storage" />
                </View>
            )}
            <View className="flex-1 justify-center">
                <Button onPress={handleDownload} title="Download Image" />
                <Button onPress={handleClick} title="Pick image" />
            </View>
        </View>
    );
}

