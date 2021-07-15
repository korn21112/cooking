import React , {useCallback, useEffect, useRef, useState} from 'react';
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
import { createStackNavigator} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function Profile(){
  
  const getCurrentUser = () => {
    const user = auth().currentUser;
    console.log(user);
  }

  const navigation = useNavigation();
  const [name, setName] = useState('');
  // const [age, setAge] = useState('')
  const getUser = async () => {
    const userDocument = await firestore().collection("users").
    doc('2TPLmvIzSFk6eaPuv6PJ').get()
    console.log(userDocument);
    setName(userDocument.data().name)
  }

  const signOut = () => {
    auth()
  .signOut()
  .then(() => console.log('User signed out!'));
  }

  const onPressLogOutHandle = () => {
    signOut();
    navigation.replace('Login');
  }

  useEffect(() => {
    getUser();
    getCurrentUser();
  },[]);

  return(
    <View style={styles.sectionContainer}>
      {/* <Text style={styles.textHeader}>
        Welcome {name} {auth()?.currentUser.email} to ...!
      </Text>      
      <Image
        style={styles.logo}
        source={require('../../assets/cooking.png')}
      /> */}
      <TouchableOpacity
        onPress={()=>{onPressLogOutHandle()}}
        // onPress={()=>{navigation.navigate('PutIngredient')}}
      >
          <Text style={styles.textStart}>log out</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
    sectionContainer: {
      flex: 1,
    //   justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF3E6',
    },
    textHeader: {
        margin: 10,
        fontSize: 40,
        textAlign: 'center',
        fontFamily:'DancingScript-Regular'
    },
    textStart: {
        fontSize: 20,
        color: '#FF8C10',
    },
    input: {
      width: 300,
      borderWidth: 1,
      borderColor: '#555',
      borderRadius: 10,
      backgroundColor: '#ffffff',
      textAlign: 'center',
      fontSize: 20,
      marginTop: 130,
      marginBottom: 10,
  },
  logo: {
    width:200,
    height:200,
    margin:20,
},
  });
  
  export default Profile;