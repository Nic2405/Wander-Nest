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
    backgroundColor: '#edf2f7', // Softer neutral tone
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heading: {
    fontSize: 34,
    fontWeight: '700',
    color: '#2c5282',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.8,
  },
  subheading: {
    fontSize: 15,
    color: '#4a5568',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    height: 48,
    borderColor: '#cbd5e0',
    borderWidth: 0.8,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    width: '100%',
    maxWidth: 320,
    backgroundColor: '#ffffff',
    color: '#2d3748',
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#2b6cb0',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    width: '50%',
    maxWidth: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  loginText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.4,
  },
  forgotPassword: {
    color: '#4a5568',
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 13,
  },
  orText: {
    marginVertical: 14,
    textAlign: 'center',
    color: '#718096',
    fontSize: 13,
    fontWeight: '500',
  },
  socialButton: {
    backgroundColor: '#2d3748',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    maxWidth: 320,
  },
  socialText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  signupPrompt: {
    marginTop: 20,
    color: '#4a5568',
    fontSize: 13,
    textAlign: 'center',
  },
  signupText: {
    color: '#2b6cb0',
    fontWeight: '600',
    fontSize: 15,
    marginTop: 6,
    textAlign: 'center',
  },
  signupButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    maxWidth: 320,
    alignItems: 'center',
  },
});
