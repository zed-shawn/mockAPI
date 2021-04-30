import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import * as Scale from "../../constants/Scale";

const vs = Scale.verticalScale;

export default function PercentBox(props) {
  return (
    <TouchableOpacity style={styles.root} onPress={props.onPress}>
      <Text style={styles.text}> {props.value}% </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    elevation: vs(1),
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
    height: vs(40),
    width: "17%",
    borderRadius:5
  },

  text: {
    fontFamily: "ComoBold",
    color: Colors.activeText,
    fontSize: vs(18),
    marginHorizontal: "5%",
  },
});
