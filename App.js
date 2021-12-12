import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import SignInScreen from "./Pages/SignInScreen";
import SignUpScreen from "./Pages/SignUpScreen";
import HomeScreen from "./Pages/HomeScreen";
import AboutUs from "./Pages/AboutUs";
import SubmitFeedback from "./Pages/SubmitFeedback";
import PersonPage from "./Pages/PersonPage";
import AddClassPage from "./Pages/AddClassPage";

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
        <Stack.Screen name="AddClass" component={AddClassPage} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerLeft: () => <></>,
          }}
        />
        <Stack.Screen
          name="PersonView"
          component={PersonPage}
          options={(props) => ({ title: props.route.params.name })}
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
