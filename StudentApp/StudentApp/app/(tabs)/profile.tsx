// app/(main)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function ProfileScreen() {
  // Static info; replace with real data if needed.
  const name = 'Mahmoud Mardeni';
  const email = 'Mah.doe@example.com';
  const busRoute = 'Qudsaya saburb';
  const busStation = 'Dwar Troi';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bus Route:</Text>
        <Text style={styles.value}>{busRoute}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Bus Station:</Text>
        <Text style={styles.value}>{busStation}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f2f5',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007bff',
    width: 120,
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
});
