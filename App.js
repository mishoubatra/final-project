import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SignInScreen from "./Pages/SignInScreen";
import SignUpScreen from "./Pages/SignUpScreen";
import HomeScreen from "./Pages/HomeScreen";
import AboutUs from "./Pages/AboutUs";
import SubmitFeedback from "./Pages/SubmitFeedback";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignIn"
          options={{
            title: "Sign In",
          }}
          component={SignInScreen}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} options={{
          headerLeft: () => <></>,
        }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
