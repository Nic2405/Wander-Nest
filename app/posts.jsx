import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Alert, Image, ScrollView, Switch } from 'react-native';
import React, { useState, useEffect } from 'react';
import { db, auth, storage } from '../firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Link } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true);
  const [isDraft, setIsDraft] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    fetchPosts();
    loadDrafts();
    requestPermissions();
  }, []);

  const fetchPosts = async () => {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    const postsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(postsData);
  };



  const handleUpdatePost = async () => {
    if (!editingId || !title || !content) return;
    try {
      await updateDoc(doc(db, 'posts', editingId), {
        title,
        content,
      });
      setTitle('');
      setContent('');
      setEditingId(null);
      fetchPosts();
      Alert.alert('Success', 'Post updated!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      fetchPosts();
      Alert.alert('Success', 'Post deleted!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permissions needed', 'Camera and media library permissions are required for photo uploads.');
    }
  };

  const pickImage = async () => {
    Alert.alert(
      'Select Image',
      'Choose an option',
      [
        { text: 'Camera', onPress: openCamera },
        { text: 'Gallery', onPress: openGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };



  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const filename = `post_${Date.now()}.jpg`;
    const storageRef = ref(storage, `posts/${auth.currentUser.uid}/${filename}`);

    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const saveDraft = async () => {
    const draft = {
      id: Date.now().toString(),
      title,
      content,
      notes,
      image,
      isPublic,
      createdAt: new Date().toISOString(),
    };

    const updatedDrafts = [...drafts, draft];
    setDrafts(updatedDrafts);
    await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));

    // Reset form
    setTitle('');
    setContent('');
    setNotes('');
    setImage(null);
    setIsPublic(true);

    Alert.alert('Success', 'Draft saved!');
  };

  const loadDrafts = async () => {
    try {
      const savedDrafts = await AsyncStorage.getItem('drafts');
      if (savedDrafts) {
        setDrafts(JSON.parse(savedDrafts));
      }
    } catch (error) {
      console.error('Error loading drafts:', error);
    }
  };

  const loadDraft = (draft) => {
    setTitle(draft.title || '');
    setContent(draft.content || '');
    setNotes(draft.notes || '');
    setImage(draft.image || null);
    setIsPublic(draft.isPublic !== undefined ? draft.isPublic : true);
  };

  const deleteDraft = async (draftId) => {
    const updatedDrafts = drafts.filter(draft => draft.id !== draftId);
    setDrafts(updatedDrafts);
    await AsyncStorage.setItem('drafts', JSON.stringify(updatedDrafts));
  };

  const handleAddPost = async () => {
    if (!title || !content) {
      Alert.alert('Error', 'Title and content are required!');
      return;
    }

    if (isDraft) {
      await saveDraft();
      return;
    }

    try {
      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image.uri);
      }

      const postData = {
        title,
        content,
        notes,
        imageUrl,
        isPublic,
        userId: auth.currentUser.uid,
        createdAt: new Date(),
      };

      await addDoc(collection(db, 'posts'), postData);

      // Reset form
      setTitle('');
      setContent('');
      setNotes('');
      setImage(null);
      setIsPublic(true);

      fetchPosts();
      Alert.alert('Success', 'Post published!');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const startEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setNotes(post.notes || '');
    setImage(post.imageUrl ? { uri: post.imageUrl } : null);
    setIsPublic(post.isPublic !== undefined ? post.isPublic : true);
    setEditingId(post.id);
  };

  const renderPost = ({ item }) => (
    <View style={styles.post}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postContent}>{item.content}</Text>
      <View style={styles.postActions}>
        <TouchableOpacity onPress={() => startEdit(item)} style={styles.editButton}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeletePost(item.id)} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.heading}>My Travel Posts</Text>

      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Content"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={styles.imagePickerText}>{image ? 'Change Photo' : 'Add Photo'}</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image.uri }} style={styles.imagePreview} />}

      <View style={styles.visibilityContainer}>
        <Text style={styles.visibilityLabel}>Public</Text>
        <Switch value={isPublic} onValueChange={setIsPublic} />
      </View>

      <View style={styles.visibilityContainer}>
        <Text style={styles.visibilityLabel}>Save as Draft</Text>
        <Switch value={isDraft} onValueChange={setIsDraft} />
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={editingId ? handleUpdatePost : handleAddPost}
      >
        <Text style={styles.addButtonText}>{editingId ? 'Update Post' : 'Add Post'}</Text>
      </TouchableOpacity>

      <Text style={styles.subHeading}>Drafts</Text>
      {drafts.length === 0 && <Text style={styles.noDrafts}>No drafts saved.</Text>}
      {drafts.map((draft) => (
        <View key={draft.id} style={styles.draftItem}>
          <Text style={styles.draftTitle}>{draft.title}</Text>
          <View style={styles.draftActions}>
            <TouchableOpacity onPress={() => loadDraft(draft)} style={styles.loadDraftButton}>
              <Text style={styles.buttonText}>Load</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteDraft(draft.id)} style={styles.deleteDraftButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />

      <View style={styles.navigationContainer}>
        <Link href="/discover" style={styles.navButton}>
          <Text style={styles.navButtonText}>Discover Posts</Text>
        </Link>
        <Link href="/" style={styles.homeButton}>
          <Text style={styles.homeButtonText}>Back Home</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7fafc',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6b46c1',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
  },
  addButton: {
    backgroundColor: '#6b46c1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  post: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b46c1',
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
    color: '#2d3748',
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#38a169',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#e53e3e',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  link: {
    backgroundColor: '#6b46c1',
    padding: 15,
    borderRadius: 8,
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
  },
  imagePicker: {
    backgroundColor: '#f7fafc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#2d3748',
    fontSize: 16,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  visibilityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  visibilityLabel: {
    fontSize: 16,
    color: '#2d3748',
    fontWeight: '600',
  },
  subHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6b46c1',
    marginTop: 20,
    marginBottom: 10,
  },
  noDrafts: {
    fontSize: 14,
    color: '#2d3748',
    textAlign: 'center',
    marginBottom: 10,
  },
  draftItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  draftTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6b46c1',
    marginBottom: 10,
  },
  draftActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loadDraftButton: {
    backgroundColor: '#38a169',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  deleteDraftButton: {
    backgroundColor: '#e53e3e',
    padding: 8,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  navigationContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  navButton: {
    backgroundColor: '#6b46c1',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  navButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeButton: {
    backgroundColor: '#2d3748',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
