import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/discover');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subheading}>Continue your travel journey</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#90A4AE"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#90A4AE"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.forgotpasswordButton}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or join with</Text>

      <TouchableOpacity style={[styles.socialButton]}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>

      <Text style={styles.signupPrompt}>New to WanderNest?</Text>

      <Link href="/signup" style={styles.signupButton}>
        <Text style={styles.signupText}>Sign Up</Text>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heading: {
    fontSize: 36,
    fontWeight: '800',
    color: '#2b6cb0',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subheading: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#e2e8f0',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    color: '#2d3748',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#3182ce',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '50%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  forgotPassword: {
    color: '#4a5568',
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 14,
  },
  orText: {
    marginVertical: 16,
    textAlign: 'center',
    color: '#718096',
    fontSize: 14,
    fontWeight: '500',
  },
  socialButton: {
    backgroundColor: '#1a202c',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
    maxWidth: 320,
  },
  socialText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  signupPrompt: {
    marginTop: 24,
    color: '#4a5568',
    fontSize: 14,
    textAlign: 'center',
  },
  signupText: {
    color: '#3182ce',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 10,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
});
