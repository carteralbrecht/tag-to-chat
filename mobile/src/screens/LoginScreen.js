import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import OktaClient from '../oktaClient.js';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: ""
    };

    this.oktaClient = new OktaClient(process.env.SERVER_URL);
  }

  async login() {
    if (this.state.email == "") {
      return alert("Please enter your email");
    }

    if (this.state.password == "") {
      return alert("Please enter your password");
    }

    let response = await this.oktaClient.signIn(this.state);
    if (response.err) {
      return console.log('Error signing in user: ', response.err);
    }

    const sessionToken = response.sessionToken;

    response = await this.oktaClient.generateAccessToken(sessionToken);
    if (response.err) {
      return console.log('Error getting access token: ', response.err);
    }

    const accessToken = response.accessToken;
    this.setState({ accessToken });

    this.props.navigation.navigate("Dashboard", {accessToken: this.state.accessToken});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!{"\n"}Let's Chat</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ email: text })}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            secureTextEntry
            placeholder="Password..."
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ password: text })}
          />
        </View>
        <TouchableOpacity onPress={() => alert("Forgot Password?")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={() => this.login()}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Register")}
        >
          <Text style={styles.loginText}>Signup</Text>
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
    justifyContent: "center",
  },
  welcomeText: {
    color: "white",
    fontSize: 30,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "grey",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    color: "white",
    height: 50,
  },
  forgot: {
    color: "white",
    fontSize: 11,
  },
  loginText: {
    color: "white",
    fontSize: 14,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#5102A1",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default LoginScreen;
