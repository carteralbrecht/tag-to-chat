import React from "react";
import { SafeAreaView, View, StyleSheet, Text, FlatList } from "react-native";
import AddMessage from "../components/AddMessage";
import ChatLog from "../components/ChatLog";

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.route.params,
      nickname: '',
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

  async componentDidMount() {
    console.log(this.props.route.params);
  }

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.topBar}>
          <Text style={styles.topText}>Chat</Text>
        </View>
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
  topBar: {
    backgroundColor: "#5102A1",
    flexDirection: "row",
    flex: 0.1,
    justifyContent: "flex-start",
    alignItems: "center",
  },

  topText: {
    color: "white",
    fontSize: 25,
    marginLeft: 10,
  },

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
