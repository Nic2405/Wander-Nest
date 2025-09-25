import 'expo-router/entry';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>DISCOVER THE WORLD</Text>
          <Text style={styles.appName}>Wander-Nest</Text>
          <Text style={styles.subtitle}>Share Your Journey • Create Memories</Text>
        </View>

        <View style={styles.linkContainer}>
          <Link href="/signup" style={styles.specialLink}>Join the Adventure</Link>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f2027', // Deeper, more elegant background
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 32, 39, 0.6)', // Slightly darker overlay
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    color: '#64B5F6',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: '600',
  },
  appName: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 17,
    color: '#90CAF9',
    letterSpacing: 1,
    fontWeight: '500',
  },
  linkContainer: {
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    gap: 15,
  },
  link: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#ffffff',
    fontSize: 18,
    padding: 14,
    width: '100%',
    borderRadius: 8, // Smaller, cleaner border radius
    overflow: 'hidden',
    textAlign: 'center',
    borderWidth: 0.5, // Thin border
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  specialLink: {
    backgroundColor: '#64B5F6',
    color: '#ffffff',
    fontSize: 18,
    padding: 14,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
});
