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
import PercentBox from "../components/design/PercentBox";
import Button from "../components/design/Button";

import Separator from "../components/design/Separator";
import Slider from "@react-native-community/slider";
import HideWithKeyboard from "react-native-hide-with-keyboard";

const vs = Scale.verticalScale;

const DashScreen = () => {
  const [amountEntered, setAmountEntered] = useState(0);
  const firstName = "Akshay";
  const earned = "23443";
  const withdrawCap = 4345;

  const inputAmount = (inputText) => {
    setAmountEntered(inputText.replace(/[^0-9]/g, ""));
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
              value={amountEntered.toString()}
              style={styles.amountInput}
              onChangeText={inputAmount}
            />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <HideWithKeyboard>
            <View style={styles.sliderRegion}>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.sliderText}>0</Text>
              </View>
              <View style={{ flex: 2, alignItems: "center" }}>
                <Slider
                  style={{
                    width: 200,
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  minimumValue={0}
                  maximumValue={withdrawCap}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  onValueChange={(a) => {
                    setAmountEntered(a.toString());
                  }}
                  step={100}
                  minimumTrackTintColor={Colors.activeText}
                  thumbTintColor={Colors.activeText}
                />
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text style={styles.sliderText}>{withdrawCap}</Text>
              </View>
            </View>
          </HideWithKeyboard>
        </View>
        <View style={{ flex: 1 }}>
          <HideWithKeyboard>
            <View style={styles.percentBoxRegion}>
              <PercentBox
                value={25}
                onPress={() => {
                  setAmountEntered(Math.ceil(withdrawCap * 0.25));
                }}
              />
              <PercentBox
                value={50}
                onPress={() => {
                  setAmountEntered(Math.ceil(withdrawCap * 0.5));
                }}
              />
              <PercentBox
                value={75}
                onPress={() => {
                  setAmountEntered(Math.ceil(withdrawCap * 0.75));
                }}
              />
              <PercentBox
                value={100}
                onPress={() => {
                  setAmountEntered(withdrawCap);
                }}
              />
            </View>
          </HideWithKeyboard>
        </View>
        <View style={{ flex: 1 }}>
          <HideWithKeyboard>
            <View style={styles.butttonRegion}>
              <Button title="PROCEED" />
            </View>
          </HideWithKeyboard>
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
  withdraw: { flex: 3, alignItems: "center", marginTop: "7%" },
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
    fontFamily: "ComoBold",
    fontSize: vs(38),
    color: Colors.activeText,
  },
  withdrawHeader: { flex: 2, alignItems: "center", marginTop: "2%" },
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
  sliderRegion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    marginVertical: "1%",
    width: "100%",
  },
  sliderText: {
    fontSize: vs(20),
    fontFamily: "ComoBold",
    color: Colors.activeText,
  },
  percentBoxRegion: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  butttonRegion: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "10%",
  },
});

export default DashScreen;
