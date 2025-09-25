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
    backgroundColor: '#1a2a3a',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 42, 58, 0.7)',
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
    fontSize: 20,
    color: '#64B5F6',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 4,
    fontWeight: '600',
  },
  appName: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 15,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#ffffff',
    fontSize: 18,
    padding: 16,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  specialLink: {
    backgroundColor: '#64B5F6',
    color: '#ffffff',
    fontSize: 18,
    padding: 16,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
