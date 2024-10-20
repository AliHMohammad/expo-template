import { Button, Text, View } from "react-native";
import React, { useCallback } from "react";
import { auth } from "../../../firebase";
import { useFocusEffect, useRouter } from "expo-router";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function UserPage() {
    const [user, setUser] = React.useState(auth.currentUser);
    const router = useRouter();

    useFocusEffect(
        useCallback(() => {
            console.log("Hello, I am focused router!");
            // Opdaterer din useState efter login/signup fra anden router.
            setUser(auth.currentUser);

            return () => {
                console.log("This route is now unfocused.");
            };
        }, []),
    );

    const handleLogout = async () => {
        auth.signOut();
        setUser(null);
    };

    return (
        <View className="flex-1">
            {user ? (
                <>
                    <Text>Hello {user.email}</Text>
                    <Button title="Log out" color="red" onPress={handleLogout} />
                </>
            ) : (
                <View className="flex-1 items-center justify-evenly">
                    <Button title="Login" onPress={() => router.navigate("/user/login")} />
                    <Button title="Signup" onPress={() => router.navigate("/user/signup")} />
                </View>
            )}
        </View>
    );
}
