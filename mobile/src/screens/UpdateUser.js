import React from "react";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import OktaClient from '../oktaClient.js';


class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    const params = this.props.route.params;
    const {accessToken, profile} = params;
    const {nickName, firstName, lastName} = profile;
    this.state = {
      accessToken,
      nickName,
      firstName,
      lastName
    };

    this.oktaClient = new OktaClient(process.env.SERVER_URL);

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
          let response = await this.oktaClient.updateProfile({userInfo: this.state});
          if (response.err) {
            alert('Error updating profile');
          }
          this.props.navigation.navigate('Dashboard');
      }
  }
  validate(){
      let isValid = true; 
  
      if (this.state.nickName == undefined) {
        isValid = false;
        alert("Please enter a nickname.");
      }
  
      if (this.state.firstName == undefined) {
        isValid = false;
        alert("Please enter your first name.");
      } 
  
      if (this.state.lastName == undefined) {
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
                label="nickName"
                name="nickName" 
                onChangeText={text => this.setState({nickName:text})}
                placeholder="Nickname"
                placeholderTextColor="white" 
                value={this.state.nickName}
                id="nickName" />
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
                value={this.state.firstName}
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
                value={this.state.lastName}
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
