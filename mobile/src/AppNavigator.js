import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/LoginScreen";
import MessageScreen from "./screens/MessageScreen";
import Register from "./screens/Registration";
import Dashboard from "./screens/Dashboard";
import UpdateUser from "./screens/UpdateUser";
import SearchRooms from "./screens/SearchRooms";
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
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SearchRooms"
        component={SearchRooms}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
