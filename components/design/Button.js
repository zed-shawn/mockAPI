import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import * as Scale from "../../constants/Scale";

const vs = Scale.verticalScale;

export default function Button(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.buttonBox}>
        <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    height: "100%",
    //width: 100,
    paddingHorizontal: 30,
    paddingVertical: 10,
    backgroundColor: "#e9e9e9",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.activeText,
    elevation: vs(5),
    borderRadius:5
  },
  buttonText: {
    fontFamily: "ComoBold",
    color: Colors.activeText,
    textAlign: "center",
    fontSize: vs(20),
  },
});
