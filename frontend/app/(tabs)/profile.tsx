import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <View style={styles.card}>
        <Text style={styles.info}>Name: Veera Karthick</Text>
        <Text style={styles.info}>Email: karthickkrish235@gmail.com.com</Text>
        <Text style={styles.info}>Blood Type: O+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#2c3e50' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 8, elevation: 3 },
  info: { fontSize: 18, marginBottom: 10, color: '#34495e' },
});