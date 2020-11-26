import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ChatLog({content, nickname }) {
  return (
    <View style={styles.chatView}>
      <Text style={styles.nickname}>{nickname}</Text>
      <View style={styles.messageView}>
        <Text style={styles.chatText}>{content}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chatView: {
    paddingBottom: 15,
  },

  messageView: {
    width: "40%",
    backgroundColor: "#449AFD",
    borderRadius: 25,
    height: 30,
    justifyContent: "center",
  },

  chatText: {
    color: "white",
    fontSize: 15,
    padding: 10,
  },

  nickname: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default ChatLog;
