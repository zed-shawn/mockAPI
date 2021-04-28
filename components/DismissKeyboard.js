import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";


//To close keyboard by touching anywhere on the screen
const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
