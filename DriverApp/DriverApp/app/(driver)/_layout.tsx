// app/(driver)/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const HamburgerIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      style={styles.hamburgerButton}
    >
      <Ionicons name="menu-outline" size={28} color="#fff" />
    </TouchableOpacity>
  );
};

export default function DriverDrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#fff',
        headerTitle: '',
        headerLeft: () => <HamburgerIcon />,
        drawerActiveTintColor: '#007bff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: styles.drawerLabel,
        drawerStyle: styles.drawer,
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="trucking"
        options={{
          title: 'Trucking',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Personal Info',
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#343a40',
    paddingVertical: 15,
    paddingHorizontal: 20,
    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    // Android shadow
    elevation: 4,
  },
  hamburgerButton: {
    marginLeft: 15,
  },
  drawer: {
    backgroundColor: '#1e1e2f',
    width: 220,
  },
  drawerLabel: {
    fontSize: 16,
    marginLeft: -10,
  },
});
