import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const handleSelectRole = (role: 'donor' | 'patient'): void => {
    // Navigate to the home screen, passing the selected role
    router.replace({ pathname: '/home', params: { userRole: role } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Sanjeevani</Text>
      <Text style={styles.subtitle}>Welcome! Who are you?</Text>

      <Pressable style={styles.button} onPress={() => handleSelectRole('donor')}>
        <Text style={styles.buttonText}>I am a Donor</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => handleSelectRole('patient')}>
        <Text style={styles.buttonText}>I am a Patient</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#c0392b', marginBottom: 10 },
  subtitle: { fontSize: 18, color: '#34495e', marginBottom: 40 },
  button: { width: '80%', padding: 15, borderRadius: 10, backgroundColor: '#27ae60', alignItems: 'center', marginBottom: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});

export default LoginScreen;