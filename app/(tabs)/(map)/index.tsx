import React from "react";
import { View } from "react-native";
import MapView, { LongPressEvent, Marker } from "react-native-maps";
import IRegion from "../../../models/Region";
import IMarker from "../../../models/Marker";
import * as Location from "expo-location";

export default function MapPage() {
    const [markers, setMarkers] = React.useState<IMarker[]>([]);
    const [region, setRegion] = React.useState<IRegion | undefined>(undefined);

    // Sætter din start region til din lokation.
    React.useEffect(() => {
        const getUserLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== "granted") {
                alert("Permission for user location not provided");
                return;
            }

            Location.getCurrentPositionAsync().then(({ coords }) =>
                setRegion({ latitude: coords.latitude, longitude: coords.longitude, latitudeDelta: 0.3, longitudeDelta: 0.3 }),
            );
        };
        getUserLocation();
    }, []);

    const handleLongPress = (e: LongPressEvent) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        const newMarker: IMarker = {
            cordinate: { latitude, longitude },
            key: e.timeStamp,
            title: "Hello world!",
        };

        setMarkers((prev) => [...prev, newMarker]);
    };

    const handleMarkerPress = (marker: IMarker) => {
        console.log("You pressed" + marker.title);
        //Navigation til en detailed side?
    };

    // Bemærk attribute 'showsUserLocation'!
    return (
        <View className="flex-1">
            <MapView region={region} loadingEnabled showsUserLocation onLongPress={handleLongPress} className="w-full h-full">
                {markers.map((marker) => (
                    <Marker
                        coordinate={{ latitude: marker.cordinate.latitude, longitude: marker.cordinate.longitude }}
                        title={marker.title}
                        key={marker.key}
                        onPress={() => handleMarkerPress(marker)}
                    />
                ))}
            </MapView>
        </View>
    );
}
