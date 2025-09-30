

import 'expo-router/entry';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <ImageBackground
      source={require('../assets/high_quality_travel.gif')}
      style={styles.container}
      resizeMode="cover"
    >
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#0f2027', // Deep charcoal background
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darker overlay
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
    color: '#8dc8f0ff', // Soft blue
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
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 17,
    color: '#64d4f6ff', // Brighter accent blue
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
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Subtle contrast
    color: '#E3F2FD', // Light blue text
    fontSize: 18,
    padding: 14,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    borderWidth: 0.3, // Smaller border width
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  specialLink: {
    backgroundColor: '#1E88E5', // Stronger blue for emphasis
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
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
