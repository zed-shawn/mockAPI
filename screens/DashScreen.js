import React, { useState, useCallback, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import Slider from "@react-native-community/slider";

import PercentBox from "../components/design/PercentBox";
import Button from "../components/design/Button";
import DismissKeyboard from "../components/DismissKeyboard";
import BillModal from "../components/BillModal";
import Separator from "../components/design/Separator";

import Colors from "../constants/Colors";
import * as Scale from "../constants/Scale";
import * as ModalActions from "../store/modalHandler";

const vs = Scale.verticalScale; // Used to proportionally scale the app on different screen sizes.

const DashScreen = () => {
  const dispatch = useDispatch();
  const [amountEntered, setAmountEntered] = useState(0); // The amount to be withdrawn

  // These variables read values from state fetched via api call
  const firstName = useSelector((state) => state.user.creds.firstName);
  const earned = useSelector((state) => state.user.balance.monthlySalary);
  const available = useSelector((state) => state.user.balance.available);
  const resetAmount = useSelector((state) => state.modal.resetTime);

  const kycBypass = useSelector((state) => state.user.status.kycBypass);
  const kycComplete = useSelector((state) => state.user.status.kycComplete);
  const disburseAllowed = useSelector(
    (state) => state.user.status.disburseAllowed
  );

  //Checks for numeric input
  const inputAmount = (inputText) => {
    if (inputText !== "") {
      setAmountEntered(parseInt(inputText.replace(/[^0-9]/g, "")));
    }
  };

  //Conditional checking of business logic parameters
  const checkB4dispatch = () => {
    if (amountEntered <= 0) {
      Alert.alert("Invalid amount", "Please enter a value greater than 0", [
        { text: "Cool!", style: "cancel", onPress: () => {} },
      ]);
    } else if (amountEntered > available) {
      Alert.alert("Invalid amount", `Please enter a value upto ${available}`, [
        { text: "Cool!", style: "cancel", onPress: () => {} },
      ]);
    } else if (!kycBypass && !kycComplete) {
      Alert.alert(
        "KYC not complete",
        `Please complete the KYC process before continuing.`,
        [{ text: "Cool!", style: "cancel", onPress: () => {} }]
      );
    } else if (!disburseAllowed) {
      Alert.alert(
        "Withdrawal not allowed",
        `Please contact the customer support.`,
        [{ text: "Cool!", style: "cancel", onPress: () => {} }]
      );
    } else {
      dispatchBillModal(amountEntered);
    }
  };

  //Resets amount everytime withdrawal is finalized
  useEffect(() => {
    setAmountEntered(0);
  }, [resetAmount]);

  //Dispatches modal after clicking Proceed
  const dispatchBillModal = useCallback(
    (amount) => {
      dispatch(ModalActions.displayBill(amount));
    },
    [dispatch]
  );

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.root} behavior="height">
        <BillModal />
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
            <Text style={styles.numberText}>{available}</Text>
          </View>
        </View>
        <View style={{ width: "100%", alignItems: "center" }}>
          <Separator width="60%" />
        </View>
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
            {/* These parts hide when keyboard is dispayed, to declutter */} 
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
                    maximumValue={available}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#000000"
                    onValueChange={(a) => {
                      setAmountEntered(a);
                    }}
                    step={100}
                    minimumTrackTintColor={Colors.activeText}
                    thumbTintColor={Colors.activeText}
                    value={amountEntered}
                  />
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={styles.sliderText}>{available}</Text>
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
                    setAmountEntered(Math.ceil(available * 0.25));
                  }}
                />
                <PercentBox
                  value={50}
                  onPress={() => {
                    setAmountEntered(Math.ceil(available * 0.5));
                  }}
                />
                <PercentBox
                  value={75}
                  onPress={() => {
                    setAmountEntered(Math.ceil(available * 0.75));
                  }}
                />
                <PercentBox
                  value={100}
                  onPress={() => {
                    setAmountEntered(available);
                  }}
                />
              </View>
            </HideWithKeyboard>
          </View>
          <View style={{ flex: 1 }}>
            <HideWithKeyboard>
              <View style={styles.butttonRegion}>
                <Button title="PROCEED" onPress={checkB4dispatch} />
              </View>
            </HideWithKeyboard>
          </View>
        </View>
      </KeyboardAvoidingView>
    </DismissKeyboard>
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
