import React from "react";
import { SafeAreaView, View, StyleSheet, Text, FlatList, VirtualizedList, StatusBar, Button } from "react-native";
import AddMessage from "../components/AddMessage";
import ChatLog from "../components/ChatLog";
import Header from "../components/Header";

import { AutoScrollFlatList } from "react-native-autoscroll-flatlist";

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
      name: '',
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
    this.socket = io(process.env.SERVER_URL);

    this.socket.on('connect', () => {
      if (this.state.activeRoom) {
        this.handleJoinRoom(this.state.activeRoom);
      } else {
        this.props.navigation.navigate('Login');
      }
    });

    this.socket.on('messageError', (err) => {
      alert('error sending message');
      console.log(err);
    });

    // Update the chat if a new message is broadcasted.
    this.socket.on('push', (msg) => {
      this.setState((state) => ({
        chat: [...state.chat, msg],
      }));
    });
  }

  async componentWillUnmount() {
    if (this.state.activeRoom) {
      this.socket.disconnect();
      await this.handleLeaveRoom(this.state.activeRoom);
    }
  }

  // Call this when the user wants to go back to dashboard
  async handleLeaveRoom() {
    const activeRoom = this.state.activeRoom;
    if (!activeRoom) {
      return this.props.navigation.navigate('Login');
    }

    console.log('leaving ', activeRoom);

    const accessToken = this.oktaClient.getAccessToken();
    const response = await this.oktaClient.leaveRoom(activeRoom);
    if (response.err) {
      return console.log(response.err);
    }

    this.socket.emit('leaveRoom', accessToken);

    this.setState({ activeRoom: '', chat: []});

    console.log('Leave room successful');

    this.props.navigation.navigate('Dashboard', {accessToken: this.state.accessToken});
  }

  async handleJoinRoom(roomId) {
    const accessToken = this.oktaClient.getAccessToken();
    const response = await this.oktaClient.joinRoom(roomId);
    if (response.err) {
      console.log('error');
      return console.log(response.err);
    }

    const room = response;

    this.socket.emit('joinRoom', accessToken);

    console.log('Join room successful');

    const {name, messages} = room;
    this.setState((state) => ({
      name,
      chat: [...state.chat, ...messages]
    }), this.scrollToBottom);
  }

  async submitHandler(content) {
    const accessToken = await this.oktaClient.getAccessToken();
    
    this.socket.emit('message', {
      accessToken,
      content
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.background}>
        <View style={styles.fixToText}>
          <Button
            title="Back"
            color="#fff"
            onPress={() => this.handleLeaveRoom() }
          />
          <Header title={this.state.name}/>
          <Button
            title="Log Out"
            color="#fff"
            onPress={() => this.props.navigation.navigate("Login") }
          />
        </View>
        <AutoScrollFlatList
          style={styles.messageBlock}
          data={this.state.chat}
          threshold={20}
          renderItem={({ item }) => (
            <ChatLog content={item.content} nickname={item.name} isSelf={item.name === this.state.nickName} />
          )}
          keyExtractor={(item) => item._id}
        />
        <AddMessage submitHandler={this.submitHandler.bind(this)} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: "#5102A1",
    height: 34
  },

  fixToText: {
    flexDirection: 'row',
    backgroundColor: "#5102A1",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10
  },

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
    padding: 10,
    backgroundColor: "#303030"
  },

  background: {
    flex: 1,
    backgroundColor: "#5102A1",
  },
});

export default MessageScreen;
