import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from "react-native";

import OktaClient from '../oktaClient.js';

class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      username: "",
      password: "",
      forgotOpen: false,
      forgotErr: "",
      error: "",
    };

    this.oktaClient = new OktaClient("http://192.168.1.133:5000");

    this.handleForgot = this.handleForgot.bind(this);
  }

  async handleForgotToggle(){
    this.setState({forgotOpen: !this.state.forgotOpen});
  }

  async handleForgot() {
    const response = await this.oktaClient.forgot(this.state);
    if (response.err) {
      return console.log(response.err);
    }

    this.handleForgotToggle();
  }

  async login() {
    if (this.state.email == "") {
      return this.setState({ error: "Please enter an email" });
    }

    if (this.state.password == "") {
      return this.setState({ error: "Please enter a password" });
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
        <Text style={styles.welcomeText}>tagToChat</Text>
        <Text style={styles.error}>{this.state.error}</Text>
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
        <TouchableOpacity onPress={() => this.handleForgotToggle()}>
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
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.forgotOpen}
        >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.forgotText}>Enter your email below.  You will be sent an email containing a link to reset your password.</Text>
                <View style={styles.forgotView}>
                  <TextInput
                    style={styles.inputText}
                    placeholder="Email.."
                    placeholderTextColor="white"
                    value={this.state.email}
                    onChangeText={(text) => this.setState({ email: text })}
                  />
                </View>
                <TouchableOpacity style={styles.submitBtn} onPress={() => this.handleForgot()}>
                  <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.handleForgotToggle()}>
                  <Text style={styles.loginText}>Close</Text>
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
    padding: 35,
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
  modalText: {
    color: "white"
  },
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
  forgotView: {
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 25,
    height: 50,
    marginTop: 10,
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
  forgotText: {
    color: "white",
    fontSize: 14
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
  submitBtn: {
    width: "40%",
    backgroundColor: "#5102A1",
    borderRadius: 25,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  },

  error: {
    fontSize: 12,
    color: "yellow",
    marginBottom: 10,
  },
});

export default LoginScreen;
