import React, {Fragment} from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import WaterHydrationStatus from '../../screens/WaterHydrationStatus';
import HealthTips from '../../screens/HealthTips';
import Settings from '../../screens/Settings';
import MedicineList from '../../screens/MedicineList';

import WATER_TAB_IMAGE from '../../assets/water.png';
import MEDICINE_TAB_IMAGE from '../../assets/tablet.png';
import HEALTH_TIPS_TAB_IMAGE from '../../assets/heart.png';
import SETTINGS_TAB_IMAGE from '../../assets/settings.png';

const Tab = createBottomTabNavigator();

 const BottomTabScreen = () =>  {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#3eb16e',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'MedicineTab') {
            return (
              <Image
                source={MEDICINE_TAB_IMAGE}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: color,
                }}
              />
            );
          } else if (route.name === 'WaterTab') {
            return (
              <Image
                source={WATER_TAB_IMAGE}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: color,
                }}
              />
            );
          } else if (route.name === 'HealthTipsTab') {
            return (
              <Image
                source={HEALTH_TIPS_TAB_IMAGE}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: color,
                }}
              />
            );
          } else if (route.name === 'SettingsTab') {
            return (
              <Image
                source={SETTINGS_TAB_IMAGE}
                style={{
                  height: 24,
                  width: 24,
                  tintColor: color,
                }}
              />
            );
          }
        },
      })}>
      <Tab.Screen
        name="MedicineTab"
        component={MedicineList}
        options={{
          title: 'Medicine',
          headerStyle: {
            backgroundColor: '#FAFAFA',
            elevation: 5,
            borderBottomWidth: 0.5,
            borderColor:'#EDEDED'

          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            marginLeft: 8,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />
      <Tab.Screen
        name="WaterTab"
        component={WaterHydrationStatus}
        options={{
          title: 'Water Hydration',
          headerStyle: {
            backgroundColor: '#FAFAFA',
            elevation: 5,
            borderBottomWidth: 0.5,
            borderColor:'#EDEDED'
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />
      <Tab.Screen
        name="HealthTipsTab"
        component={HealthTips}
        options={{
          title: 'Health Tips',
          headerStyle: {
            backgroundColor: '#FAFAFA',
            elevation: 5,
            borderBottomWidth: 0.5,
            borderColor:'#EDEDED'
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: '#FAFAFA',
            elevation: 5,
            borderBottomWidth: 0.5,
            borderColor:'#EDEDED'
          },
          headerTintColor: '#3eb16e',
          headerTitleStyle: {
            //fontWeight: 'bold',
            marginLeft: 8,
            fontSize: 20,
            fontFamily: 'Poppins-Medium',
            color: '#3eb16e',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabScreen;
