import React from "react";
import { SafeAreaView, View, StyleSheet, Text, FlatList, VirtualizedList } from "react-native";
import AddMessage from "../components/AddMessage";
import ChatLog from "../components/ChatLog";

import OktaClient from '../oktaClient.js';
import config from '../config';
const io = require("socket.io-client");

class MessageScreen extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    this.state = {
      accessToken: params.accessToken,
      activeRoom: params.activeRoom,
      nickName: params.nickName,
      chat: [],
    };

    this.oktaClient = new OktaClient(process.env.SERVER_URL);

    if (this.state.accessToken) {
      this.oktaClient.setAccessToken(this.state.accessToken);
    } else {
      // User needs to login
      this.props.navigation.navigate('Login');
    }
  }

  async componentDidMount() {
    // Socket stuff
    this.socket = io(config[process.env.NODE_ENV].endpoint, {
      transports: ['websocket']
    });

    this.socket.on('messageError', (err) => {
      alert('error sending message');
      console.log(err);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }), this.scrollToBottom);
    });

    if (this.state.activeRoom) {
      this.handleJoinRoom(this.state.activeRoom);
    } else {
      this.props.navigation.navigate('Login');
    }
  }

  // Call this when the user wants to go back to dashboard
  async handleLeaveRoom(roomId) {
    const accessToken = this.oktaClient.getAccessToken();
    const response = await this.oktaClient.leaveRoom(roomId);
    if (response.err) {
      return console.log(response.err);
    }

    const room = response;
    console.log(room);

    this.socket.emit('leaveRoom', accessToken);

    this.setState({ activeRoom: '', chat: []});

    console.log('Leave room successful');

    this.props.navigation.navigate('Dashboard', {accessToken: this.state.accessToken});
  }

  async handleJoinRoom(roomId) {
    const accessToken = this.oktaClient.getAccessToken();
    const response = await this.oktaClient.joinRoom(roomId);
    if (response.err) {
      return console.log(response.err);
    }

    const room = response;

    this.socket.emit('joinRoom', accessToken);

    console.log('Join room successful');

    const messages = room.messages;
    this.setState((state) => ({
      chat: [...state.chat, ...messages],
    }), this.scrollToBottom);
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
        <View style={styles.topBar}>
          <Text style={styles.topText}>Chat</Text>
        </View>
        <FlatList
          style={styles.messageBlock}
          data={this.state.chat}
          renderItem={({ item }) => (
            <ChatLog content={item.content} nickname={item.name} />
          )}
          keyExtractor={(item) => item._id}
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
