import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'expo-router';

const getTimeAgo = (date) => {
  const now = new Date();
  const diff = now - date.toDate();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export default function DiscoverScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPublicPosts();
  }, []);

  const fetchPublicPosts = async () => {
    try {
      const q = query(collection(db, 'posts'), where('isPublic', '==', true));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching public posts:', error);
    }
  };

  const renderPost = ({ item }) => (
  <View style={styles.post}>
    <View style={styles.header}>
      <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{'Traveler ' + item.userId.slice(0, 5)}</Text>
        <Text style={styles.time}>{getTimeAgo(item.createdAt)}</Text>
      </View>
    </View>

    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.content}>{item.content}</Text>
    {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
    {item.location && (
      <Text style={styles.location}>
        📍 {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
      </Text>
    )}

    <View style={styles.footer}>
      <TouchableOpacity style={styles.button} onPress={() => alert('Liked!')}>
        <Text style={styles.buttonText}>👍 Like</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => alert('Comments coming soon!')}>
        <Text style={styles.buttonText}>💬 Comment</Text>
      </TouchableOpacity>
    </View>
  </View>
);


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Discover Travel Stories</Text>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Link href="/posts" style={styles.backButton}>
        <Text style={styles.backButtonText}>My Posts</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e6ecf0', // Soft blue-gray background
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2b6cb0',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  post: {
    backgroundColor: '#ffffff',
    borderRadius: 6, // Smaller border radius
    borderWidth: 0.5, // Thin border
    borderColor: '#d1d5db', // Light gray border
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2b6cb0',
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 6,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2b6cb0',
    marginBottom: 5,
  },
  content: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 10,
  },
  location: {
    fontSize: 12,
    color: '#38a169',
    fontWeight: '600',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d1d5db',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#4a5568',
  },
  backButton: {
    backgroundColor: '#3182ce',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
