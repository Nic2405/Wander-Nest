import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useFonts} from 'expo-font'//add this import
import { useEffect } from 'react'//add this import
import { SplashScreen } from 'expo-router'//add this import
SplashScreen.preventAutoHideAsync();// add this code after import

const MainLayout = () => {

  //add this code snippet right before “return”
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
    </Stack>
  )
}

export default MainLayout