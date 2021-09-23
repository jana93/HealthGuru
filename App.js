import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {persistor, store} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import AppNavigator from './src/components/navigators/StackNavigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => ({})}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
