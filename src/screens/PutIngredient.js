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

function PutIngredient() {
  const navigation = useNavigation();
  const inputRef = useRef(null);
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

  const SearchButton = () => {
    return (
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => {
          searchHandle()
        }}
      >
        <Text>
          Search
        </Text>
        {/* <FontAwesome5
          name={'plus'}
          size={20}
          color={'#ffffff'}
        /> */}
      </TouchableOpacity>
    )
  }

  const InputSection = () => {
    return (
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
      </View>
    )
  }

  const IngredientListSection = () => {
    return (
      <View>
        <FlatList
          data={ingredients}
          renderItem={({ item, index }) => (
            <View style={styles.ingredientList}>
              <View style={styles.ingredientListLeftSide}>
                <View style={styles.icon}>
                  <Text>
                    I
                  </Text>
                </View>
                <Text>
                  {item.name}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleRemoveItem(item.name)}
              >
                <Text>-</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.textHeader}>
        What ingredient do you have ????
      </Text>
      <InputSection />
      <IngredientListSection />
      <SearchButton />
    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: '#ffffff',//'#FFF3E6',
  },
  input: {
    width: 300,
    height: 50,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 10,
    paddingLeft: 20,
    marginBottom: 10,
  },
  ingredientList: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#8E908F',
  },
  ingredientListLeftSide: {
    flexDirection: 'row',
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
  searchButton: {
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
  textHeader: {
    fontSize: 30,
    textAlign: 'left',
  },
  icon: {
    marginRight: 10,
  },
  deleteButton: {
    width: 20,
    height: 20,
    borderRadius: 30,
    backgroundColor: '#FF8C10',
    justifyContent: 'center',
    alignItems: 'center',
    // elevation: 5,
  },
});

export default PutIngredient;