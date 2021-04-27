import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DashScreen from "../screens/DashScreen";

import Colors from "../constants/Colors";

const DashStackNavigator = createStackNavigator();

const defaultStackNav = {
  title: "C a s h D r a w",
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitleAlign: "center",
  headerTintColor: "white",

  headerTitleStyle: {
    fontFamily: "ComoBold",
  },
};

export const DashStack = () => {
  return (
    <DashStackNavigator.Navigator screenOptions={defaultStackNav}>
      <DashStackNavigator.Screen name="Dash" component={DashScreen} />
    </DashStackNavigator.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <DashStack />
    </NavigationContainer>
  );
};

export default MainNavigator;
