import React from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View,
  Button,
  Alert,
  TouchableHighlight
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements"


class SearchRooms extends React.Component {

  state = {
    nickname: "",
    firstName: "",
    lastName: ""
  };

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    return (
      <View style={ styles.container }>
        <Header2 title="Enter Chat Room Information"/>
        <View style={styles.inputContainer}>
            <View style={styles.inputView}>
                <TextInput 
                    type="text" 
                    style={styles.inputText}
                    label="roomTag"
                    name="roomTag" 
                    onChangeText={text => this.setState({roomTag:text})}
                    placeholder="Search for rooms using tags"
                    placeholderTextColor="white" 
                    id="roomTag" />
            </View>
            <TouchableOpacity 
                style={styles.registerBtn}
                onPress={this.handleSubmit} >
                <Text 
                    style={styles.registerText}>Search
                </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputView}>
                <TextInput 
                    type="text" 
                    style={styles.inputText}
                    label="roomCode"
                    name="roomCode" 
                    onChangeText={text => this.setState({roomCode:text})}
                    placeholder="Join room using invite code"
                    placeholderTextColor="white" 
                    id="roomCode" />
            </View>
            <TouchableOpacity 
                style={styles.registerBtn}
                onPress={this.handleSubmit} >
                <Text 
                    style={styles.registerText}>Join
                </Text>
            </TouchableOpacity>
        </View>
        <Header2 title="Search Results:"/>
        <ScrollView style={ styles.cardContainer }>
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 1</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 1
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 1 button pressed')}
              color="#5102A1"
            />
          </Card> 
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 2</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 2
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 2 button pressed')}
              color="#5102A1"
            />
          </Card> 
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 3</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 3
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 3 button pressed')}
              color="#5102A1"
            />
          </Card>  
        </ScrollView>
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
      alignItems: "center",
      marginBottom: 30
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
    width: "90%",
    backgroundColor: "grey",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
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
    width: "90%",
    backgroundColor: "#5102A1",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
}
});

export default SearchRooms;
