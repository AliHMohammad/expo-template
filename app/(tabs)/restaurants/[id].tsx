import { View, Text, Button, TextInput, Image } from "react-native";
import React from "react";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { storage } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import RestaurantsEndpoint from "../../../services/RestaurantsEndpoint";

export default function RestaurantPage() {
    // Endpoint værdi. Det ID vi har sendt afsted får vi fat i med nedenstående.
    const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
    const [input, setInput] = React.useState(name);
    const [imagePath, setImagePath] = React.useState("");
    const [isEditing, setIsEditing] = React.useState(false);

    React.useEffect(() => {
        // Vi henter det tilhørende billede fra firebase storage ud fra id'et på Restaurant
        // Sæt det i useStaten imagePath
        // Hvis intet billede er, så catch console.log()
        const storageRef = ref(storage, `image_${id}`);
        getDownloadURL(storageRef)
            .then((url) => setImagePath(url))
            .catch(() => console.log("No Image found"));
    }, [id]);

    const handleEdit = () => {
        // Update og gå tilbage
        RestaurantsEndpoint.updateRestaurant(id, { name: input });
        router.back();
    };

    const handleUpload = async () => {
        // Vælg et billede fra album
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
        });

        if (result.canceled) {
            console.log("User clicked on cancel");
            return;
        }

        const image = result.assets[0].uri;

        // Lave en blob
        // Upload til firebase storage
        // Sæt det i useStaten imagePath
        const res = await fetch(image);
        const blob = await res.blob();
        const storageRef = ref(storage, `image_${id}`);

        await uploadBytes(storageRef, blob);

        setImagePath(image);
        alert("Image uploaded!");
    };

    return (
        <View className="flex flex-1 justify-center items-center">
            {/* Nedenstående ændrer din header til en dynamisk navn ud fra name */}
            <Stack.Screen
                options={{
                    headerTitle: "Restaurant " + name,
                }}
            />
            {!isEditing ? (
                <>
                    {imagePath && <Image className="w-28 h-28" source={{ uri: imagePath }} />}
                    <Text>Name: {name}</Text>
                    <Button title="Edit" onPress={() => setIsEditing(true)} />
                </>
            ) : (
                <>
                    <View className="mb-5">
                        {imagePath && <Image className="w-28 h-28" source={{ uri: imagePath }} />}
                        <Button title={imagePath ? "Edit Image" : "Upload Image"} onPress={handleUpload} />
                    </View>
                    <View>
                        <TextInput className="border m-3 p-2" value={input} onChangeText={setInput} />
                        <Button title="Finish" onPress={handleEdit} />
                    </View>
                </>
            )}
        </View>
    );
}
