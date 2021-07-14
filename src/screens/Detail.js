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
    Image,
} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';

const Stack = createStackNavigator();

function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const [foods, setFoods] = useState([]);
    const [doc, setDoc] = useState('');
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('')

    const getDetail = () => {
        const subscriber =
            firestore()
                .collection("foods")
                .where('name', '==', item.name)//.where('ingredients', '==', ['rice','egg','pork'])
                .onSnapshot(doc => {
                    let food = []
                    doc.forEach(doc => {
                        food.push(doc.data())
                        setDoc(doc.ref._documentPath._parts[1])
                        console.log(doc.ref._documentPath._parts[1])
                    })

                    setFoods(food)
                })
    }

    const onPressRemoveHandle = () => {
        firestore()
            .collection('foods')
            .doc(doc)
            .delete()
            .then(() => {
                console.log('food deleted!');
            });
        navigation.goBack();
    }

    const onPressUpdateHandle = () => {
        navigation.navigate('UpdateDetail',{ item })
    }

    useEffect(() => {
        getDetail()
    }, []);

    return (
        // <ScrollView>
        <ScrollView style={styles.sectionContainer}>
            <Text style={styles.textTopHeader}>
                {item.name}
            </Text>
            <View style={styles.pictureContent}>
                <Image
                    style={styles.logo}
                    // source={require('../../assets/food.jpg')}
                    source={{
                        uri: foods[0]?.pictureURL
                    }}
                />
            </View>
            <View style={styles.ingredientContent}>
                <Text style={styles.textHeader}>
                    Ingredient
            </Text>
                <FlatList
                    data={foods[0]?.ingredients}
                    renderItem={({ item, index }) => (
                        <View style={styles.foodlist}>
                            <TouchableOpacity
                            // onPress={()=>handleRemoveItem(item.name)}
                            >
                                <Text style={styles.textContent}>
                                    - {item}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View style={styles.methodContent}>
                <Text style={styles.textHeader}>
                    Method
                </Text>
                <FlatList
                    data={foods[0]?.recipe}
                    renderItem={({ item, index }) => (
                        <View style={styles.foodlist}>
                            <TouchableOpacity
                            // onPress={()=>handleRemoveItem(item.name)}
                            >
                                <Text style={styles.textContent}>
                                    - {item}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <Button
                title="update"
                color="#FF8C10"
                onPress={() => onPressUpdateHandle()}
            />
            <Button
                title="remove"
                color="red"
                onPress={() => onPressRemoveHandle()}
            />
        </ScrollView>
        // </ScrollView>

    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        backgroundColor: '#FFF3E6',
    },
    methodContent: {
        marginBottom: 10,
    },
    textHeader: {
        margin: 10,
        fontSize: 40,
        fontFamily: 'DancingScript-Regular'
    },
    textTopHeader: {
        margin: 10,
        fontSize: 50,
        fontFamily: 'DancingScript-Regular',
        textAlign: 'center',
    },
    textContent: {
        margin: 10,
        fontSize: 15,
        fontFamily: 'Yomogi-Regular',
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
        width: 200,
        height: 200,
        margin: 20,
    },
    pictureContent: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Detail;