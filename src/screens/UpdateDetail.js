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

function UpdateDetail() {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const [foods, setFoods] = useState([]);
    const [doc, setDoc] = useState('');
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('')
    const [ingredients, setIngredients] = useState([]);
    const [ingredientInput, setIngredientInput] = useState('');
    const [pictureInput, setPictureInput] = useState('');
    const [menuName, setMenuName] = useState('');
    const [recipe, setRecipe] = useState([]);
    const [recipeInput, setRecipeInput] = useState('');

    const onPressIngredientsHandle = (ingredient) => {
        setIngredients([...ingredients, ingredient])
    }

    const onPressRecipeHandle = (item) => {
        setRecipe([...recipe, item])
    }

    const handleRemoveIngredient = (name) => {
        setIngredients(ingredients.filter(item => item !== name));
    };

    const handleRemoveMethod = (content) => {
        setRecipe(recipe.filter(item => item !== content));
    };

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
                    setIngredients(food[0].ingredients)
                    setRecipe(food[0].recipe)
                    setMenuName(food[0].name)
                    setPictureInput(food[0].pictureURL)
                    setFoods(food)
                })
    }

    const onPressAddHandle = () => {
        firestore()
            .collection('foods')
            .add({
                name: menuName,
                pictureURL: pictureInput,
                ingredients: ingredients,
                recipe: recipe
            })
            .then(() => {
                console.log('User added!');
            });
        setIngredientInput('');
        setIngredients([]);
        setPictureInput('');
        setMenuName('');
        setRecipe([]);
        setRecipeInput('');
        navigation.navigate('AllMenu')
    }

    const onPressUpdateHandle = () => {
        firestore()
            .collection('foods')
            .doc(doc)
            .update({
                name: menuName,
                pictureURL: pictureInput,
                ingredients: ingredients,
                recipe: recipe
            })
            .then(() => {
                console.log('food updated!');
            });
        navigation.goBack();
    }

    useEffect(() => {
        getDetail()
    }, []);

    return (
        // <ScrollView>
        <ScrollView style={styles.sectionContainer}>
            <Text style={styles.textHeader}>
                Name of Menu
            </Text>
            <View style={styles.sectionInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Menu Name'
                    value={foods[0]?.name}
                    onChangeText={(value) => setMenuName(value)}
                />
            </View>
            <Text style={styles.textHeader}>
                picture URL
            </Text>
            <View style={styles.sectionInput}>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Picture URL'
                    value={foods[0]?.pictureURL}
                    onChangeText={(value) => setPictureInput(value)}
                />
            </View>
            <View style={styles.ingredientContent}>
                <Text style={styles.textHeader}>
                    Ingredient
                </Text>
                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Ingredient'
                        // value={name}
                        onChangeText={(value) => setIngredientInput(value)}
                    />
                    <Button
                        title="Enter"
                        color="#FF8C10"
                        onPress={() => onPressIngredientsHandle(ingredientInput)}
                    />
                </View>

                <FlatList
                    data={ingredients}
                    renderItem={({ item, index }) => (
                        <View style={styles.foodlist}>
                            <TouchableOpacity
                                onPress={() => handleRemoveIngredient(item)}
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
                <View style={styles.sectionInput}>
                    <TextInput
                        style={styles.inputMethod}
                        placeholder='Enter Method'
                        multiline
                        // numberOfLines
                        // value={name}
                        onChangeText={(value) => setRecipeInput(value)}
                    />
                    <Button
                        title="Enter"
                        color="#FF8C10"
                        onPress={() => onPressRecipeHandle(recipeInput)}
                    />
                </View>
                <FlatList
                    data={recipe}
                    renderItem={({ item, index }) => (
                        <View style={styles.foodlist}>
                            <TouchableOpacity
                                onPress={() => handleRemoveMethod(item)}
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
            onPress={()=>onPressUpdateHandle(recipeInput)}
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
    sectionInput: {
        //   justifyContent: 'center',
        alignItems: 'center',
    },
    textHeader: {
        margin: 10,
        fontSize: 40,
        fontFamily: 'DancingScript-Regular'
    },
    textTopHeader: {
        margin: 10,
        fontSize: 45,
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
        marginTop: 10,
        marginBottom: 10,
    },
    inputMethod: {
        width: 300,
        height: 200,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        // textAlign: 'center',
        textAlignVertical: 'top',
        fontSize: 20,
        marginTop: 10,
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

export default UpdateDetail;