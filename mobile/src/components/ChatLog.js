import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, Modal, Pressable } from "react-native";

function ChatLog({content, nickname, isSelf }) {
  const [modalVisible, setModalVisible] = useState(false);

  let tooLong = content.length > 450;
  let facadeContent;

  if (tooLong) {
    facadeContent = content.substring(0, 400) + "...Click for more";
  }

  const pressHandler = () => {
    setModalVisible(true);
  }

  return (
    <View style={[styles.chatView, isSelf && styles.chatViewSelf]}>
      <Text style={styles.nickname}>{nickname}</Text>
      <View style={[styles.messageView, isSelf && styles.messageSelf]}>
        {
          tooLong ? 
          <TouchableHighlight onPress={pressHandler}>
            <Text style={[styles.chatText, isSelf && styles.chatTextSelf]}>{facadeContent}</Text>
          </TouchableHighlight>
          :
          <Text style={[styles.chatText, isSelf && styles.chatTextSelf]}>{content}</Text>
        }
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPressIn={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.modalText}>{content}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#303030",
    borderRadius: 20,
    padding: 35,
    maxHeight: 500,
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

  chatView: {
    paddingBottom: 15,
  },

  chatViewSelf: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  messageSelf: {
    backgroundColor: "#5102A1",
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },

  messageView: {
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "space-between",
    maxHeight: 200,
    overflow: "hidden",
    marginTop: 10,
  },

  chatTextSelf: {
    color: "white"
  },

  chatText: {
    color: "black",
    fontSize: 15,
    padding: 10,
  },

  nickname: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});

export default ChatLog;
