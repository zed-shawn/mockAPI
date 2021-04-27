import React, { useState, useCallback } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import Colors from "../constants/Colors";
import * as Scale from "../constants/Scale";
import { FontAwesome } from "@expo/vector-icons";

import Separator from "../components/design/Separator";

const vs = Scale.verticalScale;

const DashScreen = () => {
  const [amountEntered, setAmountEntered] = useState("");
  const firstName = "Akshay";
  const earned = "23443";
  const withdrawCap = "4345";

  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(100);

  const inputAmount = (inputText) => {
    setAmountEntered(inputText);
  };

  return (
    <KeyboardAvoidingView style={styles.root} behavior="height">
      <View style={styles.intro}>
        <Text style={styles.introText}>Hello, {firstName} !</Text>
      </View>
      <View style={styles.earn}>
        <Text style={styles.earnText}>You have earned</Text>
        <View style={styles.horiText}>
          <FontAwesome
            name="rupee"
            size={vs(28)}
            color={Colors.activeText}
            style={{ paddingTop: "1%" }}
          />
          <Text style={styles.numberText}>{earned}</Text>
        </View>
        <Text style={styles.earnText}>this month</Text>
      </View>
      <View style={styles.withdraw}>
        <Text style={styles.withdrawText}>You can withdraw</Text>
        <View style={styles.horiText}>
          <FontAwesome
            name="rupee"
            size={vs(28)}
            color={Colors.activeText}
            style={{ paddingTop: "1%" }}
          />
          <Text style={styles.numberText}>{withdrawCap}</Text>
        </View>
      </View>
      <Separator halfWidth="20%" />
      <View style={styles.withdrawBlock}>
        <View style={styles.withdrawHeader}>
          <Text style={styles.titleText}>Withdraw</Text>
          <View style={styles.horiText}>
            <FontAwesome
              name="rupee"
              size={vs(28)}
              color={Colors.activeText}
              style={{ paddingTop: "1%" }}
            />
            <TextInput
              value={amountEntered}
              style={styles.amountInput}
              onChangeText={inputAmount}
              placeholder="0"
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.background },
  intro: { flex: 1, alignItems: "center", marginTop: "5%" },
  introText: {
    textAlign: "center",
    fontFamily: "ComoReg",
    fontSize: vs(38),
    color: Colors.activeText,
  },
  earn: { flex: 3, alignItems: "center", marginTop: "5%" },
  earnText: {
    textAlign: "center",
    fontFamily: "ComoReg",
    fontSize: vs(35),
    color: Colors.activeText,
  },
  withdraw: { flex: 3, alignItems: "center", marginTop: "10%" },
  withdrawText: {
    textAlign: "center",
    fontFamily: "ComoReg",
    fontSize: vs(35),
    color: Colors.activeText,
  },
  withdrawBlock: { flex: 7, alignItems: "center" },
  horiText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1%",
  },
  numberText: {
    fontFamily: "ComoBold",
    fontSize: vs(35),
    color: Colors.activeText,
    marginHorizontal: "2%",
  },
  titleText: {
    textAlign: "center",
    fontFamily: "ComoReg",
    fontSize: vs(38),
    color: Colors.activeText,
  },
  withdrawHeader: { flex: 1, alignItems: "center", marginTop: "2%" },
  amountInput: {
    width: "30%",
    borderBottomWidth: 1,
    marginLeft: "5%",
    fontSize: vs(38),
    color: Colors.activeText,
    textAlign: "center",
  },
  slider: {
    marginBottom: 10,
  },
});

export default DashScreen;
