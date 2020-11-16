import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../../client/src/screens/LoginScreen";
import Chat from "../../../client/src/screens/MessageScreen";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  </NavigationContainer>
);
