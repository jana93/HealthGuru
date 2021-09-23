import React, {Fragment} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from '../../screens/Login';
import SignUp from '../../screens/SignUp';
import InitialScreen from '../../screens/InitialScreen';
import MedicineDetails from '../../screens/MedicineDetails';
import AddMedicine from '../../screens/AddMedicine';
import EditMedicineDetails from '../../screens/EditMedicineDetails';

import BottomTabScreen from './TabNavigator';

const AppStack = createNativeStackNavigator();

const  AppNavigator = () => {
  return (
    <AppStack.Navigator>

    <AppStack.Screen
      name="InitialScreen"
      component={InitialScreen}
      options={{
        headerShown: false
      }}
    />

      <AppStack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="Bottom Tab Component"
        component={BottomTabScreen}
        options={{
          headerShown: false,
        }}
      />

      <AppStack.Screen
        name="MedicineDetails"
        component={MedicineDetails}
        options={{
          title: 'Medicine Details',
          headerStyle: {
            //backgroundColor: '#3eb16e',
            backgroundColor: '#FAFAFA',
            elevation: 2,
            borderBottomWidth: 0,
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: -8,
            fontSize: 20,
            ontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />

      <AppStack.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{
          title: 'Add Medicine Details',
          headerStyle: {
            //backgroundColor: '#3eb16e',
            backgroundColor: '#FAFAFA',
            elevation: 2,
            borderBottomWidth: 0,
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: -8,
            fontSize: 20,
            ontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />

      <AppStack.Screen
        name="EditMedicineDetails"
        component={EditMedicineDetails}
        options={{
          title: 'Edit Medicine Details',
          headerStyle: {
            //backgroundColor: '#3eb16e',
            backgroundColor: '#FAFAFA',
            elevation: 2,
            borderBottomWidth: 0,
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: -8,
            fontSize: 20,
            ontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />
    </AppStack.Navigator>
  );
}

export default AppNavigator;
