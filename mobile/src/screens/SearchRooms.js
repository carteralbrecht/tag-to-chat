import React from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements"

import Client from "../client.js";

class SearchRooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: this.props.route.params.accessToken,
      rooms: [],
      tags: [],
      roomCode: ""
    }

    this.client = new Client(process.env.SERVER_URL);

    if (this.state.accessToken) {
      this.client.setAccessToken(this.state.accessToken);
    } else {
      // User needs to login
      this.props.navigation.navigate('Login');
    }

    this.handleSearch = this.handleSearch.bind(this);
  }

  async handleSearch() {
    const response = await this.client.search(this.state.tags);
    if (response.err) {
      return console.log(response.err);
    }

    console.log(response);

    this.setState({rooms: response.rooms});

    this._inputElement.blur();
  }

  async handleAddRoom(roomId) {
    const response = await this.client.addRoom(roomId);
    if (response.err) {
      return console.log(response.err);
    }

    // Reset room list excluding room user just added
    await this.handleSearch();
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={ styles.container }>
        <Header2 title="Enter Chat Room Information"/>
        <View style={styles.inputContainer}>
            <View style={styles.inputView}>
                <TextInput
                    ref={ref => { this._inputElement = ref }}
                    type="text" 
                    style={styles.inputText}
                    label="roomTag"
                    name="roomTag" 
                    onChangeText={text => this.setState({tags:text.split(' ')})}
                    placeholder="Room tags (Separate with spaces)"
                    placeholderTextColor="white"
                    enablesReturnKeyAutomatically={true}
                    keyboardAppearance="dark"
                    id="roomTag" />
            </View>
            <View style={styles.inputView}>
                <TextInput 
                    type="text" 
                    style={styles.inputText}
                    label="roomCode"
                    name="roomCode" 
                    onChangeText={text => this.setState({roomCode:text})}
                    placeholder="Search for rooms using invite code"
                    placeholderTextColor="white"
                    enablesReturnKeyAutomatically={true}
                    keyboardAppearance="dark"
                    id="roomCode" />
            </View>
            <TouchableOpacity 
                style={styles.registerBtn}
                onPress={this.handleSearch} >
                <Text 
                    style={styles.registerText}>Search
                    
                </Text>
            </TouchableOpacity>
        </View>
        <Header2 title="Chat List (returned):"/>
        <ScrollView style={ styles.cardContainer }>
          {
          this.state.rooms.length > 0 ? this.state.rooms.map((room) => (
            <Card containerStyle={{ borderRadius: 10 }}>
              <Card.Title>{room.name}</Card.Title>
              <Text style={{marginBottom: 10}}>
                Tags: {room.tags.join(', ')}
              </Text>
              <Card.Divider/>
              <Button
                title='Add'
                onPress={async () => await handleAddRoom(room._id)}
                color="#5102A1"
              />
            </Card> 
          )) : 
            <View style={styles.resultsView}>
              <Text style={styles.resultText}>No rooms found</Text>
            </View>
          }
        </ScrollView>
    </View> 
    );
  }
}

const styles = StyleSheet.create({
  resultText: {
    color: "white",
    fontSize: 25,
    marginTop: 100
  },
  resultsView: {
    justifyContent: "center",
    alignItems: "center",
  },
  statusbar: {
    backgroundColor: "#5102A1",
    height: 34
  },
  container: {
    flex: 1,
    backgroundColor: "#303030",
  },
  inputContainer: {
      justifyContent: "center",
      alignItems: "center"
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
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  inputView: {
    width: "80%",
    backgroundColor: "grey",
    borderRadius: 10,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
      color: "white",
      height: 50
  },
  registerText: {
    color: "white",
    fontSize: 14
},
registerBtn: {
    width: "80%",
    backgroundColor: "#5102A1",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10
}
});

export default SearchRooms;
