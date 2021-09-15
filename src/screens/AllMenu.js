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
  ImageBackground
} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

function AllMenu() {

  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [choices, setChoices] = useState([]);
  const [input, setInput] = useState('')

  const findMenu = () => {
    const subscriber =
      firestore()
        .collection("foods")
        .onSnapshot(doc => {
          if (doc) {
            let food = []
            doc.forEach(doc => {
              food.push(doc.data())
            })
            setChoices(food)
          }

        })
  }

  useEffect(() => {
    findMenu()
  }, []);

  const MenuList = () => {
    return (
      <View style={styles.menuListSection}>
        <FlatList
          data={choices}
          numColumns={2}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => { navigation.navigate('Detail', { item }) }}
            >
              <View
                style={styles.foodlist}
              >
                <ImageBackground
                  source={{
                    uri: item?.pictureURL
                  }}
                  style={styles.pictureSection}
                  resizeMode="cover"
                >
                  <View
                    style={styles.rating}
                  >
                    <Text style={styles.ratingText}>
                      S {item.rating.toFixed(1)}
                    </Text>
                  </View>
                </ImageBackground>
                <View style={styles.textListSection}>
                  <Text style={styles.foodlistText}>
                    {item.name}
                  </Text>
                  {/* <Text style={styles.foodlistText}>
                    rating: {item.rating.toFixed(2)}
                  </Text> */}
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  const SearchButton = () => {
    return (
      <TouchableOpacity
        onPress={() => onPressHandle(input)}
      >
        <View style={styles.searchButton}>
          <Text style={styles.textSearchButton}>
            Search
        </Text>
        </View>
      </TouchableOpacity>

    )
  }

  const InputSection = () => {
    return (
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder='Search any recipe'
          // value={name}
          textAlign='left'
          onChangeText={(value) => setInput(value)}
          ref={inputRef}
        />
        <SearchButton />
      </View>
    )
  }

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.textHeader}>
        Make your own food,stay at home
      </Text>
      <InputSection />
      <MenuList />

    </View>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    padding: 10,
    flex: 1,
    backgroundColor: '#ffffff',
  },
  textHeader: {
    fontSize: 30,
    textAlign: 'left',
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
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  foodlist: {
    margin: 5,
    padding: 5,
    justifyContent: 'center',
    flex: 1,
  },
  foodlistText: {
    fontSize: 20,
    color: '#4C4A48',
    // fontFamily: 'Yomogi-Regular',
    flex: 1,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: '#FF8C10',
    height: 50,
    width: 70,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSearchButton: {
    color: '#ffffff'
  },
  menuListSection: {
    flex: 1,
  },
  textListSection: {
    // flex:1,
  },
  pictureSection: {
    flex: 1,
    width: '100%',
    height: 150,
    backgroundColor: 'white',
    borderRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
    elevation: 5,
  },
  rating: {
    width: 55,
    height: 25,
    borderRadius: 30,
    backgroundColor: '#FF8C10',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  ratingText: {
    fontWeight: 'bold',
    color: 'white',
  }
});

export default AllMenu;