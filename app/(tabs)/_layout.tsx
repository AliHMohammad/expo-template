import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

// Vi fortæller hvordan vores tab naviagtion skal se ud.
export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="restaurants"
                options={{
                    title: "Restaurants",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
                    headerShown: false,
                }}
            />
            <Tabs.Screen
                name="(images)"
                options={{
                    title: "Images",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="image" color={color} />,
                }}
            />
            <Tabs.Screen
                name="(map)"
                options={{
                    title: "Map",
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="map" color={color} />,
                }}
            />
        </Tabs>
    );
}

