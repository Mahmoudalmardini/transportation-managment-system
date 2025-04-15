// app/(driver)/home.tsx
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function DriverHomeScreen() {
  const { username } = useLocalSearchParams();
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome, {username || 'Driver'}!</Text>
      <Text style={styles.subtitle}>Dashboard</Text>
      
      <TouchableOpacity style={styles.card} onPress={() => router.push('./profile')}>
        <Text style={styles.cardTitle}>Personal Info</Text>
        <Text style={styles.cardDescription}>View your personal details.</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.card} onPress={() => router.push('./trucking')}>
        <Text style={styles.cardTitle}>Trucking</Text>
        <Text style={styles.cardDescription}>Start sharing your current location.</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    // Android shadow
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007bff',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});
