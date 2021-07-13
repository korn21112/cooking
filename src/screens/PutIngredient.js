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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function PutIngredient(){

  const navigation = useNavigation();
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('')
  const [input,setInput] = useState('')
  const [ingredients, setIngredients] = useState([
      {name: "egg"},
      {name: "rice"}
  ])

  const onPressHandle = (ingredient)=> {
      setIngredients([...ingredients, {name: ingredient}])
  }

  const handleRemoveItem = (name) => {
     setIngredients(ingredients.filter(item => item.name !== name));
   };

  useEffect(() => {

  },[]);

  return(
    <View style={styles.sectionContainer}>
      <TextInput
                style={styles.input}
                placeholder='Enter Ingredient'
                // value={name}
                onChangeText={(value)=>setInput(value)}
      />
      <Button
        title="Enter"
        color="#FF8C10"
        onPress={()=>onPressHandle(input)}
      />
      <Text>
          {input}
      </Text>
      <FlatList
        data={ingredients}
        renderItem={({item, index})=>(
            <View style={styles.ingredientList}>
                <TouchableOpacity
                    onPress={()=>handleRemoveItem(item.name)}
                >
                    <Text style={styles.ingredientListText}>
                        - {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        title='Search'
        color="#FF8C10"
        onPress={()=>{navigation.navigate('Menu',{ingredients})}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
      padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E6',
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  ingredientList: {
    margin: 10,
    // padding: 10,
    // backgroundColor: '#FF8C10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientListText: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'DancingScript-Regular',
  }
  });
  
  export default PutIngredient;