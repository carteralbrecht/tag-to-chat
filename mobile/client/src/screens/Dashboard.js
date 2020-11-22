import React from "react";
import Header from "../components/Header";
import Header2 from "../components/Header2";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
  Button,
  Alert,
} from "react-native";
import { Card, ListItem, Icon } from "react-native-elements"


class Dashboard extends React.Component {
  state = {
    email: "",
    password: "",
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ screenHeight: contentHeight });
  };

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;

    return (
      <View style={ styles.container }>
        {statusbar}
        <View style={styles.fixToText}>
          <Icon
            name='person'
            size='30'
            color="#fff"
            title="Profile"
            onPress={() => Alert.alert('Profile button pressed')}
          />
          <Icon
            name='search'
            size='30'
            color='#fff'
            title="Search"
            onPress={() => Alert.alert('Search button pressed')}
          />
          <Header title="Dashboard"/>
          <Button
            title="Log Out"
            color="#fff"
            onPress={() => Alert.alert('Log out button pressed')}
          />
        </View>
        <Header2 title="Chat List:"/>
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
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 4</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 4
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 4 button pressed')}
              color="#5102A1"
            />
          </Card> 
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 5</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 5
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 5 button pressed')}
              color="#5102A1"
            />
          </Card> 
          <Card containerStyle={{ borderRadius: 10 }}>
            <Card.Title>Chat 6</Card.Title>
            <Text style={{marginBottom: 10}}>
              Description for Chat 6
            </Text>
            <Card.Divider/>
            <Button
              title='Open'
              onPress={() => Alert.alert('Chat 6 button pressed')}
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
  }
});

export default Dashboard;
