import { Image, Text, View } from "react-native";
import { Github } from "../../models/Github";
import React from "react";

export default function ProfilePage() {
    const [account, setAccount] = React.useState<Github | null>(null);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch("https://api.github.com/users/alihmohammad").then((d) => d.json() as Promise<Github>);
                setAccount(data);
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            }
        };

        fetchData()
    }, [])
    

    return (
        <View className="flex flex-1 justify-center items-center">
            <Text className="text-blue-500">Profile page!</Text>
            <Text>Name: {account?.name}</Text>
            <Image className="w-52 h-52 mx-auto" src={account?.avatar_url} />
        </View>
    );
}
