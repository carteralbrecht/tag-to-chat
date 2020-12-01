import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import OktaClient from '../oktaClient.js';

class Reg extends React.Component {
  constructor() {
    super();
    this.state = {
      nickName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: ""
    };

    this.oktaClient = new OktaClient("http://192.168.1.133:5000");

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (!this.validate()) {
      // Show errors on form
      return;
    }

    let response = await this.oktaClient.register(this.state);
    if (response.err) {
      return console.log(response.err);
    }

    if (!response.user) {
      return console.log('Unknown error');
    }

    this.props.navigation.navigate("Login");
  }

  validate() {
    let isValid = true;

    if (this.state.nickName == "") {
      isValid = false;
      this.setState({ error: "Please enter a nickname" });
      return isValid;
    }

    if (this.state.email == "") {
      isValid = false;
      this.setState({ error: "Please enter an email" });
      return isValid;
    }

    if (this.state.password == "") {
      isValid = false;
      this.setState({ error: "Please enter a password" });
      return isValid;
    }

    if (this.state.confirmPassword == "") {
      isValid = false;
      this.setState({ error: "Please confirm password" });
      return isValid;
    }

    if (
      this.state.password !== "undefined" &&
      this.state.confirmPassword !== "undefined"
    ) {
      if (this.state.password != this.state.confirmPassword) {
        isValid = false;
        this.setState({ error: "Passwords do not match" });
        return isValid;
      }
    }
    return isValid;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Registration </Text>
        <Text style={styles.error}>{this.state.error}</Text>
        <View style={styles.inputView}>
          <TextInput
            type="text"
            style={styles.inputText}
            label="nickName"
            name="nickName"
            onChangeText={(text) => this.setState({ nickName: text })}
            placeholder="Enter nickname"
            placeholderTextColor="white"
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
            id="email"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            type="password"
            style={styles.inputText}
            label="password"
            name="password"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder="Enter password"
            placeholderTextColor="white"
            id="password"
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            type="password"
            style={styles.inputText}
            label="Confirm Password"
            name="confirmPassword"
            secureTextEntry={true}
            onChangeText={(text) => this.setState({ confirmPassword: text })}
            placeholder="Confirm password"
            placeholderTextColor="white"
            id="confirmPassword"
          />
        </View>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={this.handleSubmit}
        >
          <Text style={styles.registerText}>Register!</Text>
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
        marginTop: 40,
        marginBottom: 10
    },

    error: {
      fontSize: 12,
      color: "yellow",
      marginBottom: 10,
    },
})
  
export default Reg;
