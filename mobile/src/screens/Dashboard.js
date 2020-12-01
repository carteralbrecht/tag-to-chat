import React, { useState } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import Client from "../client.js";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.route.params.accessToken,
      email: "",
      password: "",
      rooms: []
    };

    this.client = new Client(process.env.SERVER_URL);

    if (this.state.accessToken) {
      this.client.setAccessToken(this.state.accessToken);
    } else {
      // User needs to login
      this.props.navigation.navigate('Login');
    }
  }



  async checkUser() {
    const response = await this.client.getUser();
    if (response.err) {
      return console.log(response.err);
    }

    const {profile, id: userId} = response.user;
    this.setState({ profile, userId });
  }

  async updateRooms() {
    const response = await this.client.getRooms();
    if (response.err) {
      return console.log(response.err);
    }

    this.setState({ rooms: response.rooms ? response.rooms : [] });
  }

  async updateInfo() {
    console.log('updating info');
    await this.checkUser();
    await this.updateRooms();
  }

  async handleRemoveRoom(roomId) {
    const ownerId = this.state.rooms.filter(e => e._id === roomId)[0].ownerId;
    const response = await this.client.removeRoom(roomId, ownerId);
    if (response.err) {
      return console.log(response.err);
    }

    await this.updateInfo();
  }

  handleToChat(roomId) {
    let data = {
      accessToken: this.state.accessToken,
      userId: this.state.userId,
      nickName: this.state.profile.nickName,
      activeRoom: roomId
    }

    this.props.navigation.navigate('Chat', data);
  }

  async componentDidMount() {
    await this.updateInfo();
    this.props.navigation.addListener('focus', async () => await this.updateInfo());;
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  deleteConfirmation() {
    Alert.alert(
      'Remove Chat?',
      [
        {text: 'NO', onPress: () => console.warn('delete room cancelled'), style: 'cancel'},
        {text: 'YES', onPress: async () => await this.handleRemoveRoom(room._id)},
      ]
    );
  };

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={ styles.container }>
        {statusbar}
        <View style={styles.fixToText}>
          <Icon
            name='add'
            size={30}
            color="#fff" 
            title="Profile"
            onPress={() => this.props.navigation.navigate("Create", {
              accessToken: this.state.accessToken
            })}
          />
          <Icon
            name='search'
            size={30}
            color='#fff'
            title="Search"
            onPress={() => this.props.navigation.navigate("Search", {
              accessToken: this.state.accessToken
            })}
          />
          <Header title="Dashboard"/>
          <Icon
            name='face'
            size={30}
            color="#fff" 
            title="Profile"
            onPress={() => this.props.navigation.navigate("Profile", {
              accessToken: this.state.accessToken,
              profile: this.state.profile
            })}
          />
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

              <Button
                title='Remove'
                color="#5102A1"
                onPress={this.deleteConfirmation}
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
  fixToText2: {
    flexDirection: 'row',
    backgroundColor: "#303030",
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
