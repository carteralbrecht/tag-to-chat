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
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ 
          headerShown: true,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Chat"
        component={MessageScreen}
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ 
          headerShown: false,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Profile"
        component={UpdateUser}
        options={{ 
          headerShown: true,
          gestureEnabled: false
        }}
      />
      <Stack.Screen
        name="Search"
        component={SearchRooms}
        options={{ 
          headerShown: true,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
