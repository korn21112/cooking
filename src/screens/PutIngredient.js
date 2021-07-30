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
  TouchableOpacity
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function PutIngredient() {

  const navigation = useNavigation();
  const inputRef = useRef(null);
  // const [name, setName] = useState('');
  // const [age, setAge] = useState('')
  const [input, setInput] = useState('')
  const [ingredients, setIngredients] = useState([
    { name: "egg" },
    { name: "rice" }
  ])

  const onPressHandle = (ingredient) => {
    if (input != '') {
      setIngredients([...ingredients, { name: ingredient }])
      inputRef.current.clear()
    }

  }

  const handleRemoveItem = (name) => {
    setIngredients(ingredients.filter(item => item.name !== name));
  };

  const searchHandle = () => {
    if (ingredients.length != 0) {
      navigation.navigate('Menu', { ingredients })
    }
  }

  const AddButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onPressHandle(input)}
      >
        <View style={styles.addButton}>
          <Text style={styles.textAddButton}>
            ADD
        </Text>
        </View>
      </TouchableOpacity>

    )
  }

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder='Enter Ingredient'
          // value={name}
          textAlign='left'
          onChangeText={(value) => setInput(value)}
          ref={inputRef}
        />
        <AddButton />
        {/* <Button
        title="Add"
        color="#FF8C10"
        onPress={()=>onPressHandle(input)}
      /> */}
      </View>

      {/* <Text>
          {auth().currentUser.email}
      </Text> */}
      <FlatList
        data={ingredients}
        renderItem={({ item, index }) => (
          <View style={styles.ingredientList}>
            <TouchableOpacity
              onPress={() => handleRemoveItem(item.name)}
            >
              <Text style={styles.ingredientListText}>
                - {item.name}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* <Button
        title='Search'
        color="#FF8C10"
        onPress={()=>searchHandle()}
      /> */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          dispatch(setTaskID(tasks.length + 1))
          navigation.navigate('Task');
        }}
      >
        {/* <FontAwesome5
          name={'plus'}
          size={20}
          color={'#ffffff'}
        /> */}
      </TouchableOpacity>
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
    height: 50,
    // borderWidth: 1,
    // borderColor: '#555',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 20,
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
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#FF8C10',
    height: 50,
    width: 70,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textAddButton: {
    color: '#ffffff'
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF8C10',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    elevation: 5,
},
});

export default PutIngredient;