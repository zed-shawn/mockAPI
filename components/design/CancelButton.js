import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Scale from "../../constants/Scale";

const vs = Scale.verticalScale;

export default function CancelButton(props) {
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      <Text style={styles.text}> {props.content} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    width: "40%",
    // elevation: 1,
    //backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
  },
  text: { fontFamily: "ComoReg", color: "gray", fontSize: vs(15) },
});
