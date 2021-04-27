import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import DashScreen from '../screens/DashScreen';

import Colors from '../constants/Colors';

const DashStackNavigator = createStackNavigator();

export const DashStack = () => {
  return (
    <DashStackNavigator.Navigator>
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
