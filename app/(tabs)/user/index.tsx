import { Button, Text, TextInput, View } from "react-native";
import React from "react";
import { auth } from "../../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const INIT_FORM = {
    email: "",
    password: "",
};

export default function UserPage() {
    const [signup, setSignup] = React.useState(INIT_FORM);
    const [login, setLogin] = React.useState(INIT_FORM);

    const [user, setUser] = React.useState(auth.currentUser);

    const onSignup = async () => {
        try {
            const usercreds = await createUserWithEmailAndPassword(auth, signup.email, signup.password);
            setSignup(INIT_FORM);
            setUser(usercreds.user);
        } catch (error) {
            console.log("Could not sign up user");
        }
    };

    const handleLogout = async () => {
        signOut(auth);
        setUser(null);
    };

    const onLogin = async () => {
        try {
            const usercreds = await signInWithEmailAndPassword(auth, login.email, login.password);
            setLogin(INIT_FORM);
            setUser(usercreds.user);
        } catch (error) {
            console.log("Could not login user");
        }
    };

    return (
        <>
            <View>
                <Text className="pt-3 text-center">Create user</Text>

                <Text className="pt-3 text-center">Email</Text>
                <TextInput
                    textContentType="emailAddress"
                    returnKeyType="done"
                    className="border p-3 m-3"
                    value={signup.email}
                    onChangeText={(v) => setSignup((prev) => ({ ...prev, email: v }))}
                />
                <Text className="pt-3 text-center">Password</Text>
                <TextInput
                    textContentType="password"
                    returnKeyType="done"
                    className="border p-3 m-3"
                    value={signup.password}
                    onChangeText={(v) => setSignup((prev) => ({ ...prev, password: v }))}
                />
                <Button title="Submit" onPress={onSignup} />
            </View>
            {user ? (
                <View className="flex-1 items-center mt-5">
                    <Text>Hello {auth.currentUser?.email}</Text>
                    <Button title="Log out" onPress={handleLogout} />
                </View>
            ) : (
                <View className="mt-5">
                    <Text className="pt-3 text-center">Login user</Text>

                    <Text className="pt-3 text-center">Email</Text>
                    <TextInput
                        returnKeyType="done"
                        className="border p-3 m-3"
                        value={login.email}
                        onChangeText={(v) => setLogin((prev) => ({ ...prev, email: v }))}
                    />
                    <Text className="pt-3 text-center">Password</Text>
                    <TextInput
                        returnKeyType="done"
                        className="border p-3 m-3"
                        value={login.password}
                        onChangeText={(v) => setLogin((prev) => ({ ...prev, password: v }))}
                    />
                    <Button title="Submit" onPress={onLogin} />
                </View>
            )}
        </>
    );
}
