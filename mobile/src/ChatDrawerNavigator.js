import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Chat from "./screens/MessageScreen";
import { ChatDrawerContent } from "./ChatDrawerContent";

const Drawer = createDrawerNavigator();

const ChatDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerPosition={"right"}
      drawerContent={(props) => <ChatDrawerContent {...props} />}
      edgeWidth={200}
    >
      <Drawer.Screen name="Chat" component={Chat} options={{ title: "Chat" }} />
    </Drawer.Navigator>
  );
};

export default ChatDrawerNavigator;
