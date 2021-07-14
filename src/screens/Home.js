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

function Home(){
  // // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  // const [user, setUser] = useState();
  // const navigation = useNavigation();

  // // Handle user state changes
  // function onAuthStateChanged(user) {
  //   setUser(user);
  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // const signInAnonymously = () => {
  //   console.log('signin ing')
  //   auth()
  // .signInAnonymously()
  // .then(() => {
  //   console.log('User signed in anonymously');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/operation-not-allowed') {
  //     console.log('Enable anonymous in your firebase console.');
  //   }

  //   console.error(error);
  // });
  // }

  // const signOut = () => {
  //   auth()
  // .signOut()
  // .then(() => console.log('User signed out!'));
  // }

  // const createUser = () => {
  //   auth()
  // .createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  // .then(() => {
  //   console.log('User account created & signed in!');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }

  //   console.error(error);
  // });
  // }

  // const signInByJane = () => {
  //   auth()
  // .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  // .then(() => {
  //   console.log('User account created & signed in!');
  //   navigation.navigate('BottomTabNavigator');
  // })
  // .catch(error => {
  //   if (error.code === 'auth/email-already-in-use') {
  //     console.log('That email address is already in use!');
  //   }

  //   if (error.code === 'auth/invalid-email') {
  //     console.log('That email address is invalid!');
  //   }

  //   console.error(error);
  // });
  // }

  // const getCurrentUser = () => {
  //   const user = auth().currentUser;
  //   console.log(user);
  // }

  // if (initializing) return null;

  // if (!user) {
  //   return (
  //     <View>
  //       <Text>Login</Text>
  //       <Button
  //         title='sign in anonymous'
  //         onPress={()=>{signInAnonymously()}}
  //       />
  //       <Button
  //         title='create user jane.doe'
  //         onPress={()=>{createUser()}}
  //       />
  //       <Button
  //         title='sign in by joe'
  //         onPress={()=>{signInByJane()}}
  //       />
  //     </View>
  //   );
  // }

  // return (
  //   <View>
  //     <Text>Welcome {user.email}</Text>
  //     <Button
  //         title='current user'
  //         onPress={()=>{getCurrentUser()}}
  //     />
  //     <Button
  //         title='sign out'
  //         onPress={()=>{signOut()}}
  //     />
  //   </View>
  // );
///^^^^^ test authen


  const navigation = useNavigation();
  const [name, setName] = useState('');
  // const [age, setAge] = useState('')
  const getUser = async () => {
    const userDocument = await firestore().collection("users").
    doc('2TPLmvIzSFk6eaPuv6PJ').get()
    console.log(userDocument);
    setName(userDocument.data().name)
  }

  useEffect(() => {
    getUser();
  },[]);

  return(
    <View style={styles.sectionContainer}>
      <Text style={styles.textHeader}>
        Welcome {name} to ...!
      </Text>      
      <Image
        style={styles.logo}
        source={require('../../assets/cooking.png')}
      />
      <TouchableOpacity
        onPress={()=>{navigation.navigate('BottomTabNavigator')}}
        // onPress={()=>{navigation.navigate('PutIngredient')}}
      >
          <Text style={styles.textStart}>Press to Start</Text>
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
  
  export default Home;