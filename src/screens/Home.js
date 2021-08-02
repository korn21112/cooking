import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function Home() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const navigation = useNavigation();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    setTimeout(() => {
      if(!user){
        navigation.replace('BottomTabNavigator');//('Home');
      } else {
        navigation.replace('Login');
      }
      
    },2000);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.textHeader}>
        Welcome !!!
      </Text>
      <Image
        style={styles.logo}
        source={require('../../assets/cooking.png')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E6',
  },
  textHeader: {
    margin: 10,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'DancingScript-Regular'
  },
  textStart: {
    fontSize: 20,
    color: '#FF8C10',
  },
  logo: {
    width: 200,
    height: 200,
    margin: 20,
  },
});

export default Home;