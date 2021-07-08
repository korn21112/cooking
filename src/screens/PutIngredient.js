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
      <Text>
        Welcome to ...!
      </Text>
      <TextInput
                style={styles.input}
                placeholder='Enter Ingredient'
                // value={name}
                onChangeText={(value)=>setInput(value)}
      />
      <Button
        title="buttton"
        onPress={()=>onPressHandle(input)}
      />
      <Text>
          {input}
      </Text>
      <FlatList
        data={ingredients}
        renderItem={({item, index})=>(
            <View>
                <TouchableOpacity
                    onPress={()=>handleRemoveItem(item.name)}
                >
                    <Text>
                        {item.name}
                    </Text>
                </TouchableOpacity>
            </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button
        style={styles.button}
        title='Search'
      />
    </View>
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
    marginTop: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    margin: 10,
  },
  subtitle: {
      fontSize: 20,
     margin: 10,
     color: '#999999',
  },
  button: {
      margin: 10,
  }
  });
  
  export default PutIngredient;