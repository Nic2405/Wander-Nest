import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { auth } from '../firebaseConfig'

const Profile = () => {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.appName}>Wander-Nest</Text>
        <Text style={styles.title}>My Profile</Text>

        <View style={styles.profileBox}>
          <Text style={styles.welcomeText}>Welcome back, {user ? user.email : 'Traveler'}!</Text>
          <Text style={styles.descriptionText}>Ready for your next adventure?</Text>
        </View>

        <View style={styles.linkContainer}>
          <Link href="/" style={styles.postsLink}>My Posts</Link>
          <Link href="/" style={styles.link}>Return Home</Link>
        </View>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 15,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    color: '#4a5568',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: '500',
  },
  profileBox: {
    backgroundColor: '#ffffff',
    width: '100%',
    maxWidth: 350,
    borderRadius: 16,
    padding: 25,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 28,
    color: '#2b6cb0',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  descriptionText: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  link: {
    backgroundColor: '#3182ce',
    paddingVertical: 15,
    paddingHorizontal: 32,
    borderRadius: 12,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    overflow: 'hidden',
    textAlign: 'center',
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
})