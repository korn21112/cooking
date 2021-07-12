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
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

function Menu(){

  const navigation = useNavigation();
  const route = useRoute();
  const {ingredients} = route.params;
  const [choices, setChoices] = useState([]);

    const findMenu = () => {
      let temp = []
      ingredients.forEach(item => {
        temp.push(item.name)
      })
      const subscriber = 
      firestore()
      .collection("foods")
      .where('ingredients', 'array-contains-any', temp)//.where('ingredients', '==', ['rice','egg','pork'])
      .onSnapshot(doc =>{
        let food = []
        doc.forEach(doc => {
          food.push(doc.data())
        })
        setChoices(food)
        console.log(food)
        console.log(choices)
        console.log('hello')
      })
    }

  useEffect(() => {
    findMenu()
  },[]);

  return(
    <View style={styles.sectionContainer}>
      <FlatList
        data={choices}
        renderItem={({item, index})=>(
            <View 
              style={styles.foodlist}
            >
                <TouchableOpacity
                    onPress={()=>{navigation.navigate('Detail',{item})}}
                >
                    <Text style={styles.foodlistText}>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />

    </View>
  )
}

const styles = StyleSheet.create({
    sectionContainer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#FFF3E6'
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    text: {
        // fontSize:40,
        // fontFamily:'DancingScript-Regular'
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
  foodlist: {
    margin: 10,
    padding: 10,
    backgroundColor: '#FF8C10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodlistText: {
    fontSize: 30,
    color: 'white',
  }
  });
  
  export default Menu;