import React, { useState } from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Button,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput
} from "react-native";
import { Card, Icon } from "react-native-elements";
import Client from "../client.js";

class Dashboard extends React.Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.route.params.accessToken,
      email: "",
      password: "",
      rooms: [],
      joinCodeOpen: false,
      joinCode: ""
    };

    this.client = new Client('https://cop4331-chatapp.herokuapp.com');

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
    if (this._isMounted) this.setState({ profile, userId });
  }

  async updateRooms() {
    const response = await this.client.getRooms();
    if (response.err) {
      return console.log(response.err);
    }

    if (this._isMounted) this.setState({ rooms: response.rooms ? response.rooms : [] });
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

  handleToChat(room) {
    let data = {
      accessToken: this.state.accessToken,
      userId: this.state.userId,
      nickName: this.state.profile.nickName,
      room: room
    }

    this.props.navigation.navigate('Chat', data);
  }

  async componentDidMount() {
    this._isMounted = true;

    this.props.navigation.addListener('focus', async () => {
      this._isMounted = true;
      await this.updateInfo();
    });

    this.props.navigation.addListener('blur', async () => {
      this._isMounted = false;
    });
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    if (this._isMounted) this.setState({ screenHeight: contentHeight });
  };

  showJoinCode(joinCode) {
    this.setState({joinCode, joinCodeOpen: true});
  }

  hideJoinCode() {
    this.setState({joinCode: '', joinCodeOpen: false});
  }

  deleteConfirmation(roomId) {
    Alert.alert(
      'Are you sure?',
      'Removing a room is permanent.',
      [
        {text: 'NO', onPress: () => console.warn('delete room cancelled'), style: 'cancel'},
        {text: 'YES', onPress: async () => await this.handleRemoveRoom(roomId)},
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
            onPress={() => this.props.navigation.navigate("Add", {
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
          {this.state.rooms.length > 0 ? this.state.rooms.map((room) => (
            <Card key={room._id} containerStyle={{ borderRadius: 10 }}>
              <Card.Title>{room.name}</Card.Title>
              <Text style={{marginBottom: 10}}>
                Tags: {room.tags.join(', ')}
              </Text>
              <Card.Divider/>
              <Button
                title='Open'
                onPress={() => this.handleToChat(room)}
                color="#5102A1"
              />

              <Button
                title='Show Room Code'
                color="#5102A1"
                onPress={() => this.showJoinCode(room.joinCode)}
              />

              <Button
                title='Remove'
                color="#5102A1"
                onPress={() => this.deleteConfirmation(room._id)}
              />
            </Card> 
          )) : 
            <View style={{justifyContent: "center", alignItems: "center", padding: 20, marginTop: 200}}>
              <Text style={{fontSize: 22, color: "white"}}>Looks like you aren't in any rooms</Text>
              <Text style={{fontSize: 22, color: "white"}}>Join or create one to get started</Text>
            </View>
          }
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.joinCodeOpen}
        >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.codeHeadText}>Room Code:</Text>
                <Text selectable style={styles.codeText}>{this.state.joinCode}</Text>
                <TouchableOpacity onPress={() => this.hideJoinCode()}>
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>
      </View> 
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  },
  modalView: {
    width: "80%",
    backgroundColor: "#303030",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5
  },
  codeHeadText: {
    color: "white",
    fontSize: 20,
  },
  codeText: {
    color: "white",
    fontSize: 14,
    marginTop: 20
  },
  closeText: {
    color: "white",
    fontSize: 20,
    marginTop: 20
  },
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
