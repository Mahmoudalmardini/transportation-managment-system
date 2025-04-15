import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { io } from 'socket.io-client';

// Replace with your actual server IP
const socket = io("http://192.168.73.205:5000");

export default function MapScreen() {
  const [driverLocation, setDriverLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    // When receiving location updates from the server, update state
    socket.on("locationUpdate", (data) => {
      console.log("Location update received:", data);
      setDriverLocation(data);
    });

    return () => {
      socket.off("locationUpdate");
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track Driver</Text>
      <MapView
        style={styles.map}
        region={
          driverLocation
            ? {
                ...driverLocation,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }
            : {
                // Fallback region (e.g., center of your service area)
                latitude: 33.5138,
                longitude: 36.2765,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }
        }
      >
        {driverLocation && (
          <Marker coordinate={driverLocation} title="Driver" />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 40, paddingHorizontal: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  map: { flex: 1, borderRadius: 10, marginTop: 20 }
});
