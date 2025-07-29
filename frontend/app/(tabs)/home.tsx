import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator, Alert, ListRenderItem } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getOpenRequests, findMatches } from '../../services/api';

// --- Type Definitions (can be moved to a separate types file) ---
interface User {
  id: number;
  full_name: string;
  blood_type: string;
}

interface DonationRequest {
  id: number;
  patient_id: number;
  blood_type: string;
}

// --- Components ---
const DonorView: React.FC = () => {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await getOpenRequests();
      setRequests(response.data);
    } catch (err) { Alert.alert('Error', 'Failed to fetch donation requests.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchRequests(); }, []);

  const renderItem: ListRenderItem<DonationRequest> = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.bloodType}>Need: {item.blood_type}</Text>
      <Pressable style={styles.button}><Text style={styles.buttonText}>I Can Donate</Text></Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Active Donation Requests</Text>
      {loading ? <ActivityIndicator size="large" color="#c0392b" /> : (
        <FlatList
          data={requests}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={fetchRequests} refreshing={loading}
          ListEmptyComponent={<Text style={styles.emptyText}>No active requests right now.</Text>}
        />
      )}
    </View>
  );
};

const PatientView: React.FC = () => {
    const [matches, setMatches] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const myRequestId = 1; // In a real app, this would be from user state

    const handleFindDonors = async () => {
        setLoading(true);
        try {
            const response = await findMatches(myRequestId);
            setMatches(response.data);
        } catch (error) { Alert.alert('No Donors Found', 'Could not find any compatible donors.'); setMatches([]); }
        finally { setLoading(false); }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>My Dashboard</Text>
            <Pressable style={[styles.button, styles.patientButton]} onPress={handleFindDonors}>
                <Text style={styles.buttonText}>Find Compatible Donors</Text>
            </Pressable>
            {loading && <ActivityIndicator size="large" color="#c0392b" />}
            {matches.length > 0 && (
                <View>
                    <Text style={styles.subHeader}>Available Donors:</Text>
                    {matches.map(donor => (
                        <View key={donor.id} style={styles.card}>
                            <Text style={styles.info}>Name: {donor.full_name}</Text>
                            <Text style={styles.info}>Blood Type: {donor.blood_type}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const HomeScreen: React.FC = () => {
  const { userRole } = useLocalSearchParams<{ userRole: string }>();
  return userRole === 'patient' ? <PatientView /> : <DonorView />;
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f5f5f5' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#2c3e50', textAlign: 'center' },
  subHeader: { fontSize: 20, fontWeight: '600', marginVertical: 12, color: '#2c3e50'},
  card: { backgroundColor: 'white', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 3 },
  bloodType: { fontSize: 20, fontWeight: 'bold', color: '#c0392b' },
  info: { fontSize: 16, color: '#7f8c8d', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 30, color: '#7f8c8d' },
  button: { backgroundColor: '#27ae60', padding: 12, borderRadius: 8, marginTop: 12 },
  patientButton: { backgroundColor: '#c0392b' },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 16 },
});

export default HomeScreen;