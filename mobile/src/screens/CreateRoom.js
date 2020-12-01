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
import OktaClient from "../oktaClient.js";

class CreateRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          accessToken: this.props.route.params.accessToken,
          name: "",
          tags: "",
          private: true,
          success: "",
          error: "",
        };

        this.oktaClient = new OktaClient("http://192.168.1.133:5000");

        if (this.state.accessToken) {
          this.oktaClient.setAccessToken(this.state.accessToken);
        } else {
          // User needs to login
          this.props.navigation.navigate('Login');
        }
         
        this.handleSubmit = this.handleSubmit.bind(this);
    }
         
    async handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            const response = await this.oktaClient.createRoom(this.state);
            if (response.err) {
              return console.log(response.err);
            }

            this.setState({ success: "Chat Room Created!" });
        }
    }
    validate(){
        let isValid = true; 
    
        if (this.state.name == "") {
          isValid = false;
          this.setState({ error: "Please enter a name for your room" });
          return isValid;
        }
    
        if (this.state.tags == "") {
          isValid = false;
          this.setState({ error: "Please enter at least one room tag" });
          return isValid;
        } 
    
        return isValid;
    }

  render() {
    return (
      <View style={ styles.container }>
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
                id="roomName"
            />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                type="text" 
                style={styles.inputText}
                label="roomTags"
                name="roomTags" 
                onChangeText={text => this.setState({tags:text})}
                placeholder="Chat Room Tags"
                placeholderTextColor="white" 
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
              onPress={this.handleSubmit}
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

export default CreateRoom;
