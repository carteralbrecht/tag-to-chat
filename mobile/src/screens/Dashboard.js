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
  TouchableHighlight,
  TouchableHighlightBase
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements";
import OktaClient from '../oktaClient.js';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    this.state = {
      accessToken: params.accessToken,
      email: "",
      password: "",
      rooms: []
    };

    this.oktaClient = new OktaClient(process.env.SERVER_URL);

    if (this.state.accessToken) {
      this.oktaClient.setAccessToken(this.state.accessToken);
    } else {
      // User needs to login
      this.props.navigation.navigate('Login');
    }
  }

  async checkUser() {
    const response = await this.oktaClient.getUser();
    if (response.err) {
      return console.log(response.err);
    }

    const userInfo = response.user;
    this.setState({ userInfo });
  }

  async updateRooms() {
    const response = await this.oktaClient.getRooms();
    if (response.err) {
      return console.log(response.err);
    }

    this.setState({ rooms: response.rooms ? response.rooms : [] });
  }

  handleToChat(roomId) {
    let data = {
      accessToken: this.state.accessToken,
      nickName: this.state.userInfo.profile.nickName,
      activeRoom: roomId
    }

    this.props.navigation.navigate('Chat', data);
  }

  async componentDidMount() {
    await this.checkUser();
    await this.updateRooms();
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
            onPress={() => this.props.navigation.navigate("Profile") }
          />
          <Icon
            name='search'
            size={30}
            color='#fff'
            title="Search"
            onPress={() => this.props.navigation.navigate("Search") }
          />
          <Header title="Dashboard"/>
          <Button
            title="Log Out"
            color="#fff"
            onPress={() => this.props.navigation.navigate("Login") }
          />
        </View>


        <Header2 title="Chat List:"/>
        <ScrollView style={ styles.cardContainer }>
          {this.state.rooms.map((room) => (
            <Card key={room._id} containerStyle={{ borderRadius: 10 }}>
              <Card.Title>{room.name}</Card.Title>
              <Text style={{marginBottom: 10}}>
                Tags: {room.tags.join(', ')}
              </Text>
              <Card.Divider/>
              <Button
                title='Open'
                onPress={() => this.handleToChat(room._id)}
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
