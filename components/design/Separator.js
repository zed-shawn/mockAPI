import React from "react";
import { View } from "react-native";
import Colors from "../../constants/Colors";

export default function Separator(props) {
  const width = props.halfWidth;

  return (
    <View
      style={{
        height: 0,
        //        width: width,
        marginHorizontal: width,
        borderColor: Colors.accent,
        borderTopWidth: 2,
        justifyContent: "center",
      }}
    ></View>
  );
}
