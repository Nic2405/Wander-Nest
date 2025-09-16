import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Start Your Journey!</Text>
      <Text style={styles.subheading}>Share your travel stories with the world</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Email Address" 
        placeholderTextColor="#90A4AE"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor="#90A4AE" 
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginText}>Begin Adventure</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.forgotpasswordButton}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      
      <Text style={styles.orText}>or join with</Text>
      
      <TouchableOpacity style={styles.socialButton}>
        <Text style={styles.socialText}>Continue with Apple</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.socialButton]}>
        <Text style={styles.socialText}>Continue with Google</Text>
      </TouchableOpacity>
      
      <Text style={styles.signupPrompt}>Already a traveler?</Text>
      
      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>Sign In</Text>
      </TouchableOpacity>

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
  googleButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
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
  },
});
