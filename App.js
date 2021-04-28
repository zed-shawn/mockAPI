import React, { useState, useEffect, useCallback } from "react";
import { enableScreens } from "react-native-screens";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import store from "./store/store";
import link from "./components/connections/api";
import CheckConnectivity from "./components/connections/CheckConnectivity";

import MainNavigator from "./navigation/MainNavigator";
import * as UserActions from "./store/userDetail";
import { useDispatch, useSelector } from "react-redux";

enableScreens();

function App() {
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = useState(false);

  async function loadClientDetails() {
    // Checks for net connectivity, calls api, if successful -> passes onto state. Throws error otherwise.
    const netStatus = await CheckConnectivity();
    if (netStatus) {
      let response = await fetch(link);
      let data = await response.json();
      if (data.status == true) {
        dispatchUserDetails(data);
      } else {
        Alert.alert(
          "Error retrieving data",
          "Please contact the administrator.",
          [{ text: "Cool", style: "cancel", onPress: () => {} }]
        );
      }
    }
  }

  async function loadFonts() {
    //Loads custom fonts
    await Font.loadAsync({
      ComoReg: require("./assets/fonts/Como.ttf"),
      ComoBold: require("./assets/fonts/ComoBold.ttf"),
      ComoLight: require("./assets/fonts/ComoLight.ttf"),
    });
    setFontLoaded(true);
  }
  useEffect(() => {
    // Runs at startup to call the loading functions
    loadFonts();
    loadClientDetails();
  }, []);

  const dispatchUserDetails = useCallback(
    (data) => {
      dispatch(UserActions.mapUser(data));
    },
    [dispatch]
  );

  if (fontLoaded) {
    // If font has loaded, will load the app. Else will render nothing until font has loaded.
    return <MainNavigator />;
  } else {
    return null;
  }
}

function AppWrapper() {
  // Wrapper is used as redux dispatch component is present in App body & hence not wrapped in <Provider>
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default AppWrapper;
