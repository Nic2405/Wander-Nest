import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { auth } from '../firebaseConfig';
import { useRouter } from 'expo-router';

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      Alert.alert('Success', 'You have been logged out.');
      router.push('/login'); // Navigate to login page after logout
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
      <Text style={styles.logoutText}>Log Out</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#e53e3e',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 20,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Logout;
