import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";

export default function Separator(props) {
  const width = props.width;

  return (
    <View
      style={{
        height: 10,
        borderColor: Colors.accent,
        borderTopWidth: 2,
        justifyContent: "center",
        width: width,
      }}
    ></View>
  );
}
