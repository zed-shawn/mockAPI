import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Modal, Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

import * as ModalActions from "../store/modalHandler";
import { FontAwesome } from "@expo/vector-icons";

import * as Scale from "../constants/Scale";
//import CheckConnectivity from "../components/Connections/CheckConnectivity";

const vs = Scale.verticalScale;

import CancelButton from "./design/CancelButton";
import Button from "./design/Button";
import Separator from "./design/Separator";
import ListItem from "./ListItem";

const screenWidth = Dimensions.get("screen").width;

export default function BillModal() {
  const dispatch = useDispatch();

  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const disburseAmount = useSelector((state) => state.modal.disburseAmount);

  const commissionFlat = useSelector((state) => state.user.commission.flat);
  const commissionPercent = useSelector(
    (state) => state.user.commission.percentage
  );

  const closeModal = () => {
    dispatchModalHide();
  };
  const dispatchModalHide = useCallback(() => {
    dispatch(ModalActions.modalVisible(false));
  }, [dispatch]);

  const thank = () => {
    closeModal();
    Alert.alert(
      "Report sumbitted",
      "Thank you for helping us provide better experiences!",
      [{ text: "Cool!", style: "cancel", onPress: () => {} }]
    );
  };

  const modalButton = async () => {
    /* if (inputName.trim() !== "") {
      const netStatus = await CheckConnectivity();
      if (netStatus) {
        dispatchReportFriend(friendHashID, inputName.trim());
        thank();
      }
    } */
  };

  const modalHeader = (
    <View style={styles.modalHeader}>
      <Text style={styles.subTitle}>Order Summary:</Text>
    </View>
  );

  const modalBody = (
    <View style={styles.modalBody}>
      <ListItem title={true} leftText="Bill Item" rightText="Amount" />
      <ListItem
        title={false}
        leftText="Withdrawal Amount"
        rightText={disburseAmount}
      />
      <ListItem
        title={false}
        leftText="Commission Charges"
        rightText={disburseAmount}
      />
      <Separator width="80%" />
      <View style={styles.sumView}>
        <FontAwesome
          name="rupee"
          size={vs(28)}
          color={Colors.activeText}
          style={{ paddingTop: "1%" }}
        />
        <Text style={styles.sumText}>1242343</Text>
      </View>
    </View>
  );
  const modalFooter = (
    <View style={styles.modalFooter}>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          marginVertical: 15,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <CancelButton content="Cancel" onPress={closeModal} />
        <Button title="Withdraw" onPress={modalButton} />
      </View>
    </View>
  );

  const modalContainer = (
    <View style={styles.modalContainer}>
      {modalHeader}
      {modalBody}
      {modalFooter}
    </View>
  );
  const modal = (
    <Modal
      transparent={true}
      visible={modalVisible}
      animationType="fade"
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
  },
  modalHeader: { justifyContent: "center", height: "15%" },

  subTitle: {
    fontSize: 20,
    padding: 15,
    color: Colors.activeText,
    textAlign: "center",
    fontFamily: "ComoBold",
  },

  modalBody: {
    alignItems: "center",
    height: "40%",
  },

  modalFooter: {
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
    marginBottom: "5%",
  },

  text: {
    fontFamily: "ComoReg",
    color: "gray",
    textAlign: "center",
    marginHorizontal: 10,
  },
  sumText: {
    color: Colors.activeText,
    fontFamily: "ComoBold",
    fontSize: vs(28),
    marginLeft: vs(10),
  },
  sumView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    width: "80%",
  },
});
