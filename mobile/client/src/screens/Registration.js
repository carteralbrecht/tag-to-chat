import React from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

class Reg extends React.Component {
    constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    };
     
    this.handleSubmit = this.handleSubmit.bind(this);
  }
     
  handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
        alert('Registration Successful!');
    }
  }
  
  validate(){
      let isValid = true; 
  
      if (this.state.username == undefined) {
        isValid = false;
        alert("Please enter a username.");
      }
  
      if (this.state.email == undefined) {
        isValid = false;
        alert("Please enter your email Address.");
      } 
  
      if (this.state.password == undefined) {
        isValid = false;
        alert("Please enter a password.");
      }
  
      if (this.state.confirmPassword == undefined) {
        isValid = false;
        alert("Please confirm your password.");
      }
  
      if (this.state.password !== "undefined" && this.state.confirmPassword !== "undefined") {
          
        if (this.state.password != this.state.confirmPassword) {
          isValid = false;
          alert("Passwords do not match");
        }
      } 
      return isValid;
  }
     
  render() {
    return (
      <View
        style={styles.container}>
        <Text style={styles.titleText}>Registration </Text>  
          <View style={styles.inputView}>
            <TextInput 
              type="text" 
              style={styles.inputText}
              label="username"
              name="username" 
              onChangeText={text => this.setState({username:text})}
              placeholder="Enter username"
              placeholderTextColor="white" 
              id="username" />
          </View>
  
          <View style={styles.inputView} >
            <TextInput 
              type="text" 
              style={styles.inputText}
              onChangeText={text => this.setState({email:text})}
              placeholder="Enter email"
              placeholderTextColor="white"  
              id="email" />
          </View>
   
          <View style={styles.inputView}>
            <TextInput 
              type="password" 
              style={styles.inputText}
              label="password"
              name="password" 
              secureTextEntry={true}
              onChangeText={text => this.setState({password:text})}
              placeholder="Enter password"
              placeholderTextColor="white"  
              id="password" />
          </View>
  
          <View style={styles.inputView}>
            <TextInput 
              type="password" 
              style={styles.inputText}
              label="Confirm Password"
              name="confirmPassword" 
              secureTextEntry={true}
              onChangeText={text => this.setState({confirmPassword:text})}
              placeholder="Confirm password"
              placeholderTextColor="white"  
              id="confirmPassword" />

          </View>
            <TouchableOpacity 
              style={styles.registerBtn}
              onPress={this.handleSubmit} >
              <Text 
                  style={styles.registerText}>Register!
                  
              </Text>
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
    }
})
  
export default Reg;