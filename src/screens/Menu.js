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

const Stack = createStackNavigator();

function Menu(){

  const navigation = useNavigation();
  const route = useRoute();
  const {ingredients} = route.params;
  const [choices, setChoices] = useState([]);
  const [test,setTest] = useState('');
  const foods = [
    {
        name:"omlets",
        ingredients:[
            {name:"egg"},
            {name:"rice"}
        ]
    },
    {
        name:"friedrice",
        ingredients:[
            {name:"egg"},
            {name:"rice"},
            {name:"pork"}
        ]
    }
    ]

    const findMenu = () => {
        //check ingredient in foods that your ingredients have
        //return to choice same as foods
        for(var i=0;i<foods.length;i++){
            // console.log(i)
            // console.log(foods[i].name)
            for(var j=0;j<foods[i].ingredients.length;j++){

            }
            // setChoices([...choices, {
            //     name: foods[i].name,
            //     // ingredients: foods[i].ingredients
            // }])
            // console.log(foods[i].name)
        }
        setTest('hello')
        setChoices([...choices,
          {name: foods[0].name},
          // ingredients: foods[i].ingredients
        ])

      setChoices([...choices,
        {name: foods[1].name},
        // ingredients: foods[i].ingredients
      ])
        console.log(choices.length)
    }

  useEffect(() => {
    //get data of menu
    // findMenu();
    setChoices(foods)
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
                    // onPress={()=>handleRemoveItem()}
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