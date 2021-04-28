import * as Network from "expo-network";
import { Alert } from "react-native";

const CheckConnectivity = async () => {
  const netState = await Network.getNetworkStateAsync();
  if (netState.isInternetReachable) {
    return true;
  } else {
    Alert.alert(
      "No connection detected",
      `It seems you're not connected to the internet. Please check your connection & try again.`,
      [
        {
          text: "Cool !",
          onPress: () => {},
        },
      ]
    );
  }
};

export default CheckConnectivity;
