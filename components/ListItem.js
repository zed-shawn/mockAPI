import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import * as Scale from "../constants/Scale";

const vs = Scale.verticalScale;

export default function ListItem(props) {
  const title = props.title;
  const titleStyle = {
    color: Colors.activeText,
    fontFamily: "ComoBold",
    fontSize: vs(18),
    marginVertical: vs(15),
  };
  const itemStyle = {
    color: "black",
    fontFamily: "ComoReg",
    fontSize: vs(16),
    marginVertical: vs(10),
  };
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "80%",
      }}
    >
      <Text style={title ? titleStyle : itemStyle}>{props.leftText}</Text>
      <Text style={title ? titleStyle : itemStyle}>{props.rightText}</Text>
    </View>
  );
}
