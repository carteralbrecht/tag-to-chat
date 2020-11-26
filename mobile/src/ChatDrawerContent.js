import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "react-native-elements";

export function ChatDrawerContent(props) {
  const [members] = useState([
    { nickname: "Chris", initials: "CJ", color: "#CD1717", key: "1" },
    { nickname: "Brandon", initials: "BM", color: "green", key: "2" },
    { nickname: "John", initials: "JH", color: "purple", key: "3" },
    { nickname: "Carter", initials: "CB", color: "#5102A1", key: "4" },
    { nickname: "Ryan", initials: "RD", color: "blue", key: "5" },
    { nickname: "Jacob", initials: "JR", color: "orange", key: "6" },
    { nickname: "Ortiz", initials: "RO", color: "#449AFD", key: "7" },
  ]);

  return (
    <View style={styles.background}>
      <Text style={styles.membersHeader}>Members</Text>
      <ScrollView>
        <View style={styles.membersList}>
          {members.map((item) => {
            return (
              <View key={item.key} style={styles.memberRow}>
                <Avatar
                  rounded
                  overlayContainerStyle={{ backgroundColor: item.color }}
                  title={item.initials}
                />
                <Text style={styles.memberName}>{item.nickname}</Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "grey",
  },

  membersHeader: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
  },

  membersList: {
    paddingLeft: 10,
    paddingTop: 5,
  },

  memberRow: {
    flexDirection: "row",
    alignContent: "center",
  },

  memberName: {
    color: "white",
    fontSize: 18,
    paddingBottom: 30,
    paddingLeft: 10,
    marginTop: 5,
  },
});
