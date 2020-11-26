import React from "react";
import { SafeAreaView, View, StyleSheet, Text, FlatList } from "react-native";
import AddMessage from "../components/AddMessage";
import ChatLog from "../components/ChatLog";

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.route.params,
      chat: [],
    };
  }

  submitHandler = (text) => {
    this.setState((prevMessage) => {
      return {
        chat: [...prevMessage.chat, text],
      };
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <FlatList
          style={styles.messageBlock}
          data={this.state.chat}
          renderItem={({ item }) => (
            <ChatLog item={item} nickname={this.state.nickname} />
          )}
          keyExtractor={(item) => item}
        />
        <AddMessage submitHandler={this.submitHandler} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  messageBlock: {
    marginTop: 20,
    marginLeft: 20,
  },

  background: {
    flex: 1,
    backgroundColor: "#303030",
  },
});

export default MessageScreen;
