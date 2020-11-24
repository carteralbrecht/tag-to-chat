import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../../client/src/screens/LoginScreen";
import Chat from "../../../client/src/screens/MessageScreen";
import Register from "../../../client/src/screens/Registration";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: { backgroundColor: "#5102A1" },
        headerTintColor: "white",
        headerTitleStyle: { fontSize: 25 },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
    </Stack.Navigator>
  </NavigationContainer>
);
