import { Image } from 'expo-image';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from "react";
import { Platform, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login';
import LoginOtp from './components/LoginOtp';
import PersonalInfo from './components/PersonalInfo';
import { RootStackParamList } from './app/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="LoginOtp" component={LoginOtp} options={{headerShown: false}} />
        <Stack.Screen name="PersonalInfo" component={PersonalInfo} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

