import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../../../client/src/screens/LoginScreen";
import Register from "../../../client/src/screens/Registration";
import DrawerNavigator from "./ChatDrawerNavigator";

const Stack = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
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
      <Stack.Screen name="Chat" component={DrawerNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);
