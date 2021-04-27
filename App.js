import React, { useState } from "react";
import { enableScreens } from "react-native-screens";
import { AppLoading } from "expo";
import { Provider } from "react-redux";
import * as Font from "expo-font";

import MainNavigator from "./navigation/MainNavigator";

enableScreens();

function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  async function loadFonts() {
    await Font.loadAsync({
      ComoReg: require("./assets/fonts/Como.ttf"),
      ComoBold: require("./assets/fonts/ComoBold.ttf"),
      ComoLight: require("./assets/fonts/ComoLight.ttf"),
    });
    setFontLoaded(true);
  }
  loadFonts();

  return <MainNavigator />;
}

/* export default function AppWrapper() {
  return (
    //<Provider store={store}>
    <App />
    //</Provider>
  );
} */

export default App;
