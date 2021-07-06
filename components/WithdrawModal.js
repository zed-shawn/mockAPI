import React, { useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  Dimensions,
  TextInput,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import * as Scale from "../constants/Scale";
import Colors from "../constants/Colors";

import * as ModalActions from "../store/modalHandler";
import HideWithKeyboard from "react-native-hide-with-keyboard";
import PercentBox from "../components/design/PercentBox";

import Slider from "@react-native-community/slider";
import DismissKeyboard from "../components/DismissKeyboard";

import CancelButton from "./design/CancelButton";
import Button from "./design/Button";

const vs = Scale.verticalScale;
const screenWidth = Dimensions.get("screen").width;

export default function WithdrawModal() {
  const dispatch = useDispatch();

  const [amountEntered, setAmountEntered] = useState(0); // The amount to be withdrawn

  // These variables read values from state fetched via api call
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
      if (inputText > available) {
        setAmountEntered(parseInt(available));
      } else setAmountEntered(parseInt(inputText.replace(/[^0-9]/g, "")));
    } else if (inputText == "") {
      setAmountEntered(0);
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

  // All the variables accessing value from state
  const modalVisible = useSelector((state) => state.modal.withdrawModalVisible);

  // Dispatches to action
  const closeModal = () => {
    dispatchModalHide();
  };
  const dispatchModalHide = useCallback(() => {
    dispatch(ModalActions.withdrawModalVisible(false));
    dispatch(ModalActions.resetAmount());
  }, [dispatch]);

  //Modal functions
  const dispatchBillModal = useCallback(
    (data) => {
      dispatch(ModalActions.displayBill(data));
    },
    [dispatch]
  );

  //Modal components
  const modalContainer = (
    <DismissKeyboard>
      <View style={styles.modalContainer}>
        <View style={styles.withdrawHeader}>
          <Text style={styles.titleText}>Withdraw</Text>
          <View style={styles.horiText}>
            <FontAwesome
              name="rupee"
              size={vs(32)}
              color={Colors.activeText}
              style={{ paddingTop: "1%" }}
            />
            <TextInput
              value={amountEntered.toString()}
              style={styles.amountInput}
              onChangeText={inputAmount}
              keyboardType="phone-pad"
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
        <View style={styles.butttonRegion}>
          <View style={{ marginBottom: "5%", height: "60%" }}>
            <Button title="PROCEED" onPress={checkB4dispatch} />
          </View>
          <View style={{ flex: 1 }}>
            <CancelButton content="Cancel" onPress={closeModal} />
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
  const modal = (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.modal}>
        <View>{modalContainer}</View>
      </View>
    </Modal>
  );
  return <View style={styles.container}>{modal}</View>;
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal: {
    backgroundColor: "#00000099",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#f9fafb",
    width: screenWidth * 0.9,
    borderRadius: 5,
    justifyContent: "space-between",
    height: "70%",
  },
  titleText: {
    textAlign: "center",
    fontFamily: "ComoBold",
    fontSize: vs(38),
    color: Colors.activeText,
    marginBottom: "1%",
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
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10%",
    //marginTop: "5%",
    flex: 1,
  },
  horiText: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1%",
  },
});
