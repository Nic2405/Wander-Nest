import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts} from 'expo-font'
import { useEffect } from 'react'
import { SplashScreen } from 'expo-router'
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {


const [fontsLoaded, error] = useFonts({
  "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
   "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
 
});

useEffect(() => {
  if (error) throw error;

  if (fontsLoaded) {
    SplashScreen.hideAsync();
  }
}, [fontsLoaded, error]);

if (!fontsLoaded && !error) {
  return null;
}


  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="profile" 
        options={{ 
          headerTitle: "Profile",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Sign Up",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Log In",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="posts"
        options={{
          headerTitle: "My Posts",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="discover"
        options={{
          headerTitle: "Discover",
          headerShown: true,
        }}
      />
    </Stack>
  )
}

export default MainLayout