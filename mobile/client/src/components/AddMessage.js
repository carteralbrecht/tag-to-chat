import React, { useState } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TextInput,
  Button,
  SafeAreaView,
} from "react-native";

function AddMessage({ submitHandler }) {
  const [text, setText] = useState("");

  const changeHandler = (val) => {
    setText(val);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "android" ? "height" : "padding"}
      keyboardVerticalOffset={85}
    >
      <View style={styles.inputBckrnd}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Aa"
            onChangeText={changeHandler}
          />
        </View>
        <View style={styles.btnView}>
          <Button onPress={() => submitHandler(text)} title="" color="grey" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputBckrnd: {
    backgroundColor: "#5102A1",
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  inputView: {
    width: "60%",
    backgroundColor: "grey",
    borderRadius: 25,
    height: 25,
    padding: 20,
    marginLeft: 80,
    justifyContent: "center",
  },

  inputText: {
    color: "white",
    height: 50,
  },

  btnView: {
    width: 30,
    backgroundColor: "grey",
    height: 30,
  },
});

export default AddMessage;
