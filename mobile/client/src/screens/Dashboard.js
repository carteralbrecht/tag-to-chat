import React, { useState } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Button,
  Alert,
  Modal,
  TouchableHighlight
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";

import OktaClient from '../oktaClient.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: this.props.route.params,
      email: "",
      password: "",
      rooms: [],
      isAuthenticated: true
    };

    this.oktaClient = new OktaClient(process.env.SERVER_URL);

    if (this.state.params.accessToken) {
      this.oktaClient.setAccessToken(this.state.params.accessToken);
    } else {
      // User needs to login
      this.props.navigation.navigate('Login');
    }
  }

  async checkUser() {
    if (this.state.isAuthenticated) {
      const response = await this.oktaClient.getUser();
      if (response.err) {
        return console.log(response.err);
      }

      const userInfo = response.user;
      this.setState({ userInfo });
    }
  }

  async updateRooms() {
    const response = await this.oktaClient.getRooms();
    if (response.err) {
      return console.log(response.err);
    }

    const rooms = response.rooms;
    this.setState({ rooms })
  }

  async componentDidMount() {
    await this.checkUser();
    await this.updateRooms();

    // Socket stuff

    // Join first room
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={ styles.container }>
        {statusbar}
        <View style={styles.fixToText}>
          <Icon
            name='face'
            size={30}
            color="#fff" 
            title="Profile"
            onPress={() => Alert.alert('Navigate to UpdateUser.js') }
          />
          <Icon
            name='search'
            size={30}
            color='#fff'
            title="Search"
            onPress={() => Alert.alert('Navigate to SearchChat.js')}
          />
          <Header title="Dashboard"/>
          <Button
            title="Log Out"
            color="#fff"
            onPress={() => Alert.alert('Navigate to LoginScreen.js')}
          />
        </View>


        <Header2 title="Chat List:"/>
        <ScrollView style={ styles.cardContainer }>
          {this.state.rooms.map((room) => (
            <Card containerStyle={{ borderRadius: 10 }}>
              <Card.Title>{room.name}</Card.Title>
              <Text style={{marginBottom: 10}}>
                Tags: {room.tags.join(', ')}
              </Text>
              <Card.Divider/>
              <Button
                title='Open'
                onPress={() => this.handleJoinRoom(room._id)}
                color="#5102A1"
              />
            </Card> 
          ))}
        </ScrollView>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  statusbar: {
    backgroundColor: "#5102A1",
    height: 34
  },
  container: {
    flex: 1,
    backgroundColor: "#303030",
  },
  fixToText: {
    flexDirection: 'row',
    backgroundColor: "#5102A1",
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    overflow: "scroll"
  },
  card: {
    borderRadius: 10
  }
});

export default Dashboard;
