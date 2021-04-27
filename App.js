import React from 'react';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';

import MainNavigator from './navigation/MainNavigator';

enableScreens();

const App = () => {
  return (
    //<Provider store={store}>
    <MainNavigator />
    //  </Provider>
  );
};

export default App;
