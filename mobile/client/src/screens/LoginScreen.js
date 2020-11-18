import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

class LoginScreen extends React.Component {
  state = {
    nickname: "",
    password: "",
  };

  login() {
    if (this.state.nickname == "") {
      alert("Please enter your username");
    }

    if (this.state.password == "") {
      alert("Please enter your password");
    } else {
      this.props.navigation.navigate("Chat", this.state.nickname);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!{"\n"}Let's Chat</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Username..."
            placeholderTextColor="white"
            onChangeText={(text) => this.setState({ nickname: text })}
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
