import React , {useCallback, useEffect, useRef, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home'
import PutIngredient from './screens/PutIngredient'
// import Login from './screens/Login'

const Stack = createStackNavigator();

function App(){
  return(
    // <Provider store={Store}>
      <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Login"
          component={Login}
        /> */}
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="PutIngredient"
          component={PutIngredient}
        />
        {/* <Stack.Screen
          name="Map"
          component={Map}
        />
        <Stack.Screen
          name="Camera"
          component={Camera}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
    // </Provider>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
