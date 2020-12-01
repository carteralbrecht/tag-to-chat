import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";

import {Icon} from "react-native-elements";

function AddMessage({ submitHandler }) {
  const [text, setText] = useState("");
  const [height, setHeight] = useState(0);

  const textChangeHandler = (val) => {
    setText(val);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "height" : "padding"}
    >
      <View style={styles.inputBckrnd}>
        <View style={styles.inputView}>
          <TextInput
            style={[styles.default, {height: Math.min(100, Math.max(25, height))}]}
            placeholder="Aa"
            keyboardAppearance="dark"
            multiline={true}
            onChangeText={textChangeHandler}
            value={text}
            onContentSizeChange={(event) => {
              setHeight(event.nativeEvent.contentSize.height);
            }}
          />
        </View>
        <Icon
          reverse
          name="send"
          onPress={() => {
            submitHandler(text);
            textChangeHandler('');
          }}
          color="white"
          reverseColor="#5102A1"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputBckrnd: {
    backgroundColor: "#5102A1",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  inputView: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 10,
    marginTop: 10,
    marginBottom: 10
  },

  btnView: {
    backgroundColor: "white",
    borderRadius: 25,
  },

  sendBtn: {
    backgroundColor: "white"
  }
});

export default AddMessage;
