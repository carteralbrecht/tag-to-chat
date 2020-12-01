import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Client from '../client.js';

class Reg extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: "",
      email: "",
      statusText: ""
    };

    this.client = new Client(process.env.SERVER_URL);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validate()) {
      // Show errors on form
      return;
    }

    let response = await this.client.register(this.state);
    if (response.err) {
      return console.log(response.err);
    }

    if (!response.user) {
      return console.log('Unknown error');
    }

    this.setState({statusText: "Please check your email for a link to set your password."});
  }

  validate() {
    let isValid = true;

    if (this.state.nickname == "") {
      isValid = false;
      alert("Please enter a nickname.");
    }

    if (this.state.email == "") {
      isValid = false;
      alert("Please enter your email address.");
    }

    return isValid;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Registration </Text>
        <View style={styles.inputView}>
          <TextInput
            type="text"
            style={styles.inputText}
            label="nickName"
            name="nickName"
            onChangeText={(text) => this.setState({ nickName: text })}
            placeholder="Enter nickname"
            placeholderTextColor="white"
            enablesReturnKeyAutomatically
            keyboardAppearance="dark"
            id="username"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            type="text"
            style={styles.inputText}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder="Enter email"
            placeholderTextColor="white"
            enablesReturnKeyAutomatically
            keyboardAppearance="dark"
            id="email"
          />
        </View>
        <Text style={{color: "white"}}>{this.state.statusText}</Text>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#303030",
        alignItems: "center",
        justifyContent: "center"
    },
    titleText: {
        color: "white",
        fontSize: 30,
        marginBottom: 40
    },
    inputView: {
        width: "80%",
        backgroundColor: "grey",
        borderRadius: 25,
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
        marginTop: 20,
        marginBottom: 10
    }
})
  
export default Reg;
