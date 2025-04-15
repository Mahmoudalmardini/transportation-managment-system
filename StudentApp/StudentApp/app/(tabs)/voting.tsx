// app/(main)/voting.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const daysOfWeek = ['Saturday', 'Sunday', 'Monday', 'Tuesday'];

export default function VotingScreen() {
  const router = useRouter();
  const [attendance, setAttendance] = useState(
    daysOfWeek.map((day) => ({
      day,
      selected: false,
      arrivalTime: '',
      returnTime: '',
    }))
  );

  const handleToggleDay = (index: number) => {
    setAttendance((prev) => {
      const updated = [...prev];
      updated[index].selected = !updated[index].selected;
      return updated;
    });
  };

  const handleTimeChange = (index: number, field: 'arrivalTime' | 'returnTime', value: string) => {
    setAttendance((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleSubmit = () => {
    console.log('Attendance data:', attendance);
    alert('Your votes have been submitted!');
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Voting</Text>
      <Text style={styles.subtitle}>Select the days and times you attend university.</Text>
      {attendance.map((item, index) => (
        <View key={item.day} style={styles.dayContainer}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayText}>{item.day}</Text>
            <Switch
              value={item.selected}
              onValueChange={() => handleToggleDay(index)}
            />
          </View>
          {item.selected && (
            <View style={styles.timeInputs}>
              <TextInput
                style={styles.input}
                placeholder="Arrival Time (e.g. 08:00)"
                placeholderTextColor="#666"
                value={item.arrivalTime}
                onChangeText={(val) => handleTimeChange(index, 'arrivalTime', val)}
              />
              <TextInput
                style={styles.input}
                placeholder="Return Time (e.g. 16:00)"
                placeholderTextColor="#666"
                value={item.returnTime}
                onChangeText={(val) => handleTimeChange(index, 'returnTime', val)}
              />
            </View>
          )}
        </View>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Votes</Text>
      </TouchableOpacity>
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
    marginVertical: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#007bff',
    marginBottom: 20,
    textAlign: 'center',
  },
  dayContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    // Elevation for Android
    elevation: 3,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  timeInputs: {
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
