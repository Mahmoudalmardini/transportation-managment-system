// app/(main)/home.tsx
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const { username } = useLocalSearchParams();
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome, {username || 'Student'}!</Text>
      <Text style={styles.subtitle}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Overview</Text>
        <Text style={styles.cardDescription}>
          Manage your attendance, Truck bus , and check personal information.
        </Text>
      </View>
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
    color: '#007bff', // blue accent from Cards.css
    marginBottom: 20,
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    // Elevation for Android
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
