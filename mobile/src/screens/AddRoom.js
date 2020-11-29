import React from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Alert,
  TouchableHighlight,
} from "react-native";
import { Card, ListItem, Icon, CheckBox } from "react-native-elements"


class AddRoom extends React.Component {
    constructor() {
        super();
        this.state = {
          roomName: "",
          roomTags: "",
          private: true
        };
         
        this.handleSubmit = this.handleSubmit.bind(this);
    }
         
    handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            console.log(this.state);
            alert('Chat Room Created!');
        }
    }
    validate(){
        let isValid = true; 
    
        if (this.state.roomName == "") {
          isValid = false;
          alert("Please enter a name for your room");
        }
    
        if (this.state.roomTags == "") {
          isValid = false;
          alert("Please enter at least one room tag");
        } 
    
        return isValid;
    }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
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
                onChangeText={text => this.setState({roomName:text})}
                placeholder="Chat Room Name"
                placeholderTextColor="white" 
                id="roomName" />
        </View>
        <View style={styles.inputView}>
            <TextInput 
                type="text" 
                style={styles.inputText}
                label="roomTags"
                name="roomTags" 
                onChangeText={text => this.setState({roomTags:text})}
                placeholder="Chat Room Tags"
                placeholderTextColor="white" 
                id="roomTags" />
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
              onPress={this.handleSubmit} >
              <Text 
                  style={styles.registerText}>Create Room
                  
              </Text>
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

export default AddRoom;
