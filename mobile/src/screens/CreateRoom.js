import React from "react";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { CheckBox } from "react-native-elements"
import Client from "../client.js";

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          accessToken: this.props.route.params.accessToken,
          name: "",
          tags: "",
          roomCode: "",
          private: true
        };

        this.client = new Client(process.env.SERVER_URL);

        if (this.state.accessToken) {
          this.client.setAccessToken(this.state.accessToken);
        } else {
          // User needs to login
          this.props.navigation.navigate('Login');
        }
         
        this.handleCreateRoom = this.handleCreateRoom.bind(this);
        this.handleAddRoom = this.handleAddRoom.bind(this);
    }

    async handleAddRoom(event) {
      event.preventDefault();

      if (this.validateAdd()) {
        const response = await this.client.addRoom(this.state.roomCode);
        if (response.err) {
          return console.log(response.err);
        }

        this.props.navigation.navigate('Dashboard');
      }
    }
         
    async handleCreateRoom(event) {
        event.preventDefault();
      
        if(this.validateCreate()){
          const response = await this.client.createRoom(this.state);
          if (response.err) {
            return console.log(response.err);
          }

          this.props.navigation.navigate('Dashboard');
        }
    }

    validateAdd(){
      return this.state.roomCode !== "";
  }

    validateCreate(){
        let isValid = true; 
    
        if (this.state.name == "") {
          isValid = false;
          alert("Please enter a name for your room");
        }
    
        if (this.state.tags == "") {
          isValid = false;
          alert("Please enter at least one room tag");
        } 
    
        return isValid;
    }

  render() {
    return (
      <View style={ styles.container }>
        <Header2 title="Join a Chat Room"/>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput 
              type="text" 
              style={styles.inputText}
              label="roomCode"
              name="roomCode" 
              onChangeText={text => this.setState({roomCode:text})}
              placeholder="Join room using invite code"
              placeholderTextColor="white"
              enablesReturnKeyAutomatically={true}
              keyboardAppearance="dark"
              id="roomCode" />
          </View>
          <TouchableOpacity 
            style={styles.addBtn}
            onPress={this.handleAddRoom}
          >
            <Text style={styles.registerText}>Add Room</Text>
          </TouchableOpacity>
        </View>
        <Header2 title="Create a Chat Room"/>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
              <TextInput 
                  type="text" 
                  style={styles.inputText}
                  label="roomName"
                  name="roomName" 
                  onChangeText={text => this.setState({name:text})}
                  placeholder="Chat Room Name"
                  placeholderTextColor="white"
                  enablesReturnKeyAutomatically
                  keyboardAppearance="dark"
                  id="roomName"
              />
          </View>
          <View style={styles.inputView}>
              <TextInput 
                  type="text" 
                  style={styles.inputText}
                  label="roomTags"
                  name="roomTags" 
                  onChangeText={text => this.setState({tags:text.split(' ')})}
                  placeholder="Room tags (Separate with spaces)"
                  placeholderTextColor="white"
                  enablesReturnKeyAutomatically
                  keyboardAppearance="dark" 
                  id="roomTags"
              />
          </View>
          <View>
              <CheckBox
                  center
                  title='Private'
                  checkedIcon='check'
                  checkedColor="#5102A1"
                  uncheckedIcon='close'
                  checked={this.state.private}
                  onPress={() => this.setState({private: !this.state.private})}
              />
          </View>
          <TouchableOpacity 
            style={styles.registerBtn}
            onPress={this.handleCreateRoom}
          >
            <Text style={styles.registerText}>Create Room</Text>
          </TouchableOpacity>
        </View>
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
  inputContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10
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
addBtn: {
  width: "80%",
  backgroundColor: "#5102A1",
  borderRadius: 25,
  height: 50,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 10,
  marginBottom: 10
},
registerBtn: {
    width: "80%",
    backgroundColor: "#5102A1",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10
}
});

export default CreateRoom;
