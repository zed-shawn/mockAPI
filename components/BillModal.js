import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, Text, View, Modal, Alert, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Colors from "../constants/Colors";

import * as Scale from "../constants/Scale";
//import CheckConnectivity from "../components/Connections/CheckConnectivity";

const vs = Scale.verticalScale;

import CancelButton from "./design/CancelButton";
import Button from "./design/Button";

const screenWidth = Dimensions.get("screen").width;

export default function BillModal() {
  const dispatch = useDispatch();

  //const modalVisible = useSelector((state) => state.editPage.showReportModal);

  const closeModal = () => {
    dispatchReportHide();
  };

  const thank = () => {
    closeModal();
    Alert.alert(
      "Report sumbitted",
      "Thank you for helping us provide better experiences!",
      [{ text: "Cool!", style: "cancel", onPress: () => {} }]
    );
  };

  const modalButton = async () => {
    if (inputName.trim() !== "") {
      const netStatus = await CheckConnectivity();
      if (netStatus) {
        dispatchReportFriend(friendHashID, inputName.trim());
        thank();
      }
    }
  };

  const modalHeader = (
    <View style={styles.modalHeader}>
      <Text style={styles.subTitle}>Order Confirmation:</Text>
    </View>
  );

  const modalBody = (
    <View style={styles.modalBody}>
      <View style={styles.inputHolder}>
        <TextInput
          style={styles.textInput}
          placeholder="In brief, tell us why you're reporting them..."
          onChangeText={textInputHandler}
          value={inputName}
          multiline={true}
        />
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
        <Button content="Submit" onPress={modalButton} />
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
  },
  modalHeader: { justifyContent: "center" },

  subTitle: {
    fontSize: 20,
    padding: 15,
    color: ColorsLite.primary,
    textAlign: "center",
    fontFamily: "SenBold",
  },

  modalBody: {
    //backgroundColor: "#fff",
    //paddingVertical: 20,
    //paddingHorizontal: 10,
    borderWidth: 0,
    alignItems: "center",
  },

  modalFooter: { alignItems: "center" },

  text: {
    fontFamily: "SenReg",
    color: "gray",
    textAlign: "center",
    marginHorizontal: 10,
  },
});
