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
  TouchableHighlight
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements"


class UpdateUser extends React.Component {
    constructor() {
        super();
        this.state = {
          nickname: "",
          firstName: "",
          lastName: "",
        };
         
        this.handleSubmit = this.handleSubmit.bind(this);
    }
         
    handleSubmit(event) {
        event.preventDefault();
      
        if(this.validate()){
            console.log(this.state);
            alert('Information Updated!');
        }
    }
    validate(){
        let isValid = true; 
    
        if (this.state.nickname == "") {
          isValid = false;
          alert("Please enter a nickname.");
        }
    
        if (this.state.firstName == "") {
          isValid = false;
          alert("Please enter your first name.");
        } 
    
        if (this.state.lastName == "") {
          isValid = false;
          alert("Please enter your last name.");
        }
        return isValid;
    }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={ styles.container }>
        <Header2 title="Update Information"/>
        <View style={styles.inputContainer}>
          <View style={styles.inputView}>
            <TextInput 
                type="text" 
                style={styles.inputText}
                label="nickname"
                name="nickname" 
                onChangeText={text => this.setState({nickname:text})}
                placeholder="Nickname"
                placeholderTextColor="white" 
                id="nickname" />
          </View>
          <View style={styles.inputView}>
            <TextInput 
                type="text" 
                style={styles.inputText}
                label="firstName"
                name="firstName" 
                onChangeText={text => this.setState({firstName:text})}
                placeholder="First Name"
                placeholderTextColor="white" 
                id="firstName" />
          </View>
          <View style={styles.inputView}>
            <TextInput 
                type="text" 
                style={styles.inputText}
                label="lastName"
                name="lastName" 
                onChangeText={text => this.setState({lastName:text})}
                placeholder="Last Name"
                placeholderTextColor="white" 
                id="lastName" />
          </View>
          <TouchableOpacity 
            style={styles.registerBtn}
            onPress={this.handleSubmit} >
            <Text 
                style={styles.registerText}>Save Changes
                
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

export default UpdateUser;
