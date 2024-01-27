
import * as React from 'react';

import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeTabNavigator from './navigation/HomeTabNavigator';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import Entryall from './screens/Enteryall';
import Setting from './screens/AboutScreen';
import SettingScreen from './screens/settingScreen';
import SongListScreen from './screens/SongListScreen';

const Stack = createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Entry' screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Entry" component={Entryall} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="settings" component={SettingScreen} />
        <Stack.Screen name="About" component={Setting} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="SongList" component={SongListScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

export default App;