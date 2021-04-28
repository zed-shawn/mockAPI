import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Modal, Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

import * as ModalActions from "../store/modalHandler";

import * as Scale from "../constants/Scale";
//import CheckConnectivity from "../components/Connections/CheckConnectivity";

const vs = Scale.verticalScale;

import CancelButton from "./design/CancelButton";
import Button from "./design/Button";

const screenWidth = Dimensions.get("screen").width;

export default function BillModal() {
  const dispatch = useDispatch();

  const modalVisible = useSelector((state) => state.modal.modalVisible);

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
      <Text style={styles.subTitle}>Order Confirmation:</Text>
    </View>
  );

  const modalBody = (
    <View style={styles.modalBody}>
      <Text>yo</Text>
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
        <Button title="Submit" onPress={modalButton} />
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
    height: "45%",
  },

  modalFooter: {
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
  },

  text: {
    fontFamily: "ComoReg",
    color: "gray",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
