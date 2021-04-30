import React, { useCallback } from "react";
import { Text, StyleSheet, View, KeyboardAvoidingView } from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import Button from "../components/design/Button";
import DismissKeyboard from "../components/DismissKeyboard";
import BillModal from "../components/BillModal";
import WithdrawModal from "../components/WithdrawModal";

import Colors from "../constants/Colors";
import * as Scale from "../constants/Scale";
import * as ModalActions from "../store/modalHandler";

const vs = Scale.verticalScale; // Used to proportionally scale the app on different screen sizes.

const DashScreen = () => {
  const dispatch = useDispatch();

  // These variables read values from state fetched via api call
  const firstName = useSelector((state) => state.user.creds.firstName);
  const earned = useSelector((state) => state.user.balance.monthlySalary);
  const available = useSelector((state) => state.user.balance.available);

  //Dispatches modal after clicking Proceed
  const dispatchWithdrawModal = useCallback(() => {
    dispatch(ModalActions.withdrawModalVisible(true));
  }, [dispatch]);

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView style={styles.root} behavior="height">
        <BillModal />
        <WithdrawModal />
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
        <View style={styles.butttonRegion}>
          <Button title="WITHDRAW" onPress={dispatchWithdrawModal} />
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
  butttonRegion: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
});

export default DashScreen;
