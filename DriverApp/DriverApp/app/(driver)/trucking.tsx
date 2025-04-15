import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { io } from "socket.io-client";

// Replace with your actual server IP
const socket = io("http://192.168.73.205:5000");

export default function TruckingScreen() {
  const [started, setStarted] = useState(false);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (started) {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Location permission not granted");
          return;
        }
        interval = setInterval(async () => {
          const loc = await Location.getCurrentPositionAsync({});
          const coords = { latitude: loc.coords.latitude, longitude: loc.coords.longitude };
          setLocation(coords);
          socket.emit("driverLocation", coords);
        }, 3000);
      })();
    }

    return () => clearInterval(interval);
  }, [started]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Driver Location Sharing</Text>
      <TouchableOpacity style={styles.startButton} onPress={() => setStarted(!started)}>
        <Text style={styles.startButtonText}>{started ? "Stop" : "Start"}</Text>
      </TouchableOpacity>
      {location && (
        <MapView
          style={styles.map}
          region={{
            ...location,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="You" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  startButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8 },
  startButtonText: { color: '#fff', fontWeight: 'bold' },
  map: { width: '100%', height: '60%' }
});
