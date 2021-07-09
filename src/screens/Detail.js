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

const Stack = createStackNavigator();

function Detail(){

  const navigation = useNavigation();
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('')

  useEffect(() => {

  },[]);

  return(
    <View style={styles.sectionContainer}>
      <Text style={styles.textHeader}>
        Welcome to ...!
      </Text>  
        <Image
            style={styles.logo}
            source={require('../../assets/cooking.png')}
        />
      <TouchableOpacity
        onPress={()=>{navigation.navigate('PutIngredient')}}
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
        // fontFamily:'DancingScript-Regular'
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
  
  export default Detail;