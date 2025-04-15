import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Define the allowed icon names
type IconName = 'person-outline' | 'mail-outline' | 'bus-outline' | 'location-outline';

interface ProfileItem {
  icon: IconName;
  main: string;
  sub: string;
}

const profileItems: ProfileItem[] = [
  { icon: 'person-outline', main: 'Abo Abdo', sub: 'Name' },
  { icon: 'bus-outline', main: '50', sub: 'Bus Capacity' },
  { icon: 'location-outline', main: 'Al-Kiswa', sub: 'Bus Route' },
];

export default function ProfileScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Personal Information</Text>
      {profileItems.map((item, index) => (
        <View key={index} style={styles.infoRow}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon} size={24} color="#fff" />
          </View>
          <View style={styles.textGroup}>
            <Text style={styles.mainText}>{item.main}</Text>
            <Text style={styles.subText}>{item.sub}</Text>
          </View>
        </View>
      ))}
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#343a40',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2, // For Android
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007bff', // Blue accent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textGroup: {
    flex: 1,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  subText: {
    fontSize: 14,
    color: '#999',
  },
});
