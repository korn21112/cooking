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
    Modal,
    ImageBackground,
} from 'react-native';
import { NavigationContainer, useNavigation, useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    const [foods, setFoods] = useState([]);
    const [docNum, setDocNum] = useState('');
    const [rating, setRating] = useState(0);
    const [myRating, setMyRating] = useState(0);
    const [showRemovingModal, setShowRemovingModal] = useState(false)
    const [showRatingModal, setShowRatingModal] = useState(false)
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('')

    const getDetail = () => {
        const subscriber =
            firestore()
                .collection("foods")
                .where('name', '==', item.name)//.where('ingredients', '==', ['rice','egg','pork'])
                .onSnapshot(doc => {
                    if (doc) {
                        console.log('doc not null')
                        let food = []
                        doc.forEach(doc => {
                            if (doc.exists) {
                                console.log('this doc exists')
                            }
                            food.push(doc.data())
                            setDocNum(doc.ref._documentPath._parts[1])
                            console.log(doc.ref._documentPath._parts[1])
                        })
                        setFoods(food)
                    }
                })
    }

    const getRating = (food) => {
        console.log('get rate')
        let sum = 0
        let count = 0
        let count2 = 0
        console.log('start sum = ' + sum)
        const subscriber =
            firestore()
                .collection("votes")
                .where('food', '==', item.name)
                .get()
                .then(doc => {
                    count2 = count2 + 1
                    console.log('count2 = ' + count2)
                    console.log('sum before loop = ' + sum)
                    doc.forEach(doc => {
                        sum = sum + doc.data().rating
                        count = count + 1
                    })
                    setRating((sum / count).toFixed(2))
                    /////////////////////////
                    firestore()
                        .collection('foods')
                        .doc(docNum)
                        .update({
                            name: item.name,
                            pictureURL: foods[0]?.pictureURL,
                            ingredients: foods[0]?.ingredients,
                            recipe: foods[0]?.recipe,
                            rating: sum / count
                        })
                        .then(() => {
                            console.log('rating updated!');
                        });

                })
    }

    const onPressRemoveHandle = () => {
        setShowRemovingModal(true)
        // firestore()
        //     .collection('foods')
        //     .doc(doc)
        //     .delete()
        //     .then(() => {
        //         console.log('food deleted!');
        //     });
        // navigation.goBack();
    }

    const updateRatingInFirestore = () => {
        firestore()
            .collection('foods')
            .doc(docNum)
            .update({
                name: item.name,
                pictureURL: foods[0]?.pictureURL,
                ingredients: foods[0]?.ingredients,
                recipe: foods[0]?.recipe,
                rating: rating
            })
            .then(() => {
                console.log('rating updated!');
            });
    }

    const onPressConfirmRatingHandle = () => {
        setShowRatingModal(false)
        firestore()
            .collection('votes')
            .add({
                food: item.name,
                rating: myRating,
                user: 'student eiei'
            })
            .then(() => {
                console.log('rated!');
            });
        getRating()
        // updateRatingInFirestore()
    }

    const onPressUpdateHandle = () => {
        navigation.navigate('UpdateDetail', { item })
    }

    useEffect(() => {
        setRating(item.rating.toFixed(2))
        getDetail()
        // getRating()
    }, []);

    const BackButton = () => {
        return (
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Text>
                    B
            </Text>
                {/* <FontAwesome5
              name={'plus'}
              size={20}
              color={'#ffffff'}
            /> */}
            </TouchableOpacity>
        )
    }

    const ModalRating = () => {
        return (
            <Modal
                visible={showRatingModal}
                transparent
                onRequestClose={() => setShowRatingModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.removingModal}>
                        <View style={styles.removingTitle}>
                            <Text>Rating</Text>
                        </View>
                        <Text>rate this menu {myRating}?</Text>
                        <TouchableOpacity onPress={() => setMyRating(0)}>
                            <Text>0</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMyRating(1)}>
                            <Text>1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMyRating(2)}>
                            <Text>2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMyRating(3)}>
                            <Text>3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMyRating(4)}>
                            <Text>4</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setMyRating(5)}>
                            <Text>5</Text>
                        </TouchableOpacity>
                        <Button title='yes' onPress={() => onPressConfirmRatingHandle()} />
                    </View>
                </View>
            </Modal>
        )
    }

    const ModalRemoving = () => {
        return (
            <Modal
                visible={showRemovingModal}
                transparent
                onRequestClose={() => setShowRemovingModal(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.removingModal}>
                        <View style={styles.removingTitle}>
                            <Text>Removing</Text>
                        </View>
                        <Text>do u want to remove this?</Text>
                    </View>
                </View>
            </Modal>
        )
    }

    const ImageSection = () => {
        return (
            <ImageBackground
                style={styles.pictureContent}
                source={{
                    uri: foods[0]?.pictureURL
                }}
            >
                <BackButton />
                <View style={styles.belowPicture}>
                    <View style={styles.line}></View>
                </View>
            </ImageBackground>
        )
    }

    const TopSection = () => {
        return (
            <View
                style={styles.topSection}
            >
                <Text style={styles.textNameFood}>
                    {item.name}
                </Text>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setShowRatingModal(true)}
                    >
                        <View
                            style={styles.rating}
                        >
                            <Text style={styles.ratingText}>
                                S {item.rating.toFixed(1)}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }

    const InfoSection = () => {
        return (
            <View style={styles.infoSection}>
                <View style={styles.infoContainer}>
                    <View style={styles.infoIconContainer}>

                    </View>
                    <View style={styles.infoTextContainer}>
                        <Text> 103</Text>
                        <Text>Cals</Text>
                    </View>
                </View>

            </View>
        )
    }

    const IngredientSection = () => {
        return (
            <View style={styles.ingredientSection}>
                <Text style={styles.ingredientTextHeader}>Ingredients</Text>
                <View style={styles.ingredientContentSection}>
                    <FlatList
                        data={foods[0]?.ingredients}
                        renderItem={({ item, index }) => (
                            <View style={styles.ingredientList}>
                                <View style={styles.point}>
                                </View>
                                <Text style={styles.ingredientsTextContent}>
                                    {item}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }

    const MethodSection = () => {
        return (
            <View style={styles.ingredientSection}>
                <Text style={styles.ingredientTextHeader}>
                    Method
                </Text>
                <View style={styles.ingredientContentSection}>
                    <FlatList
                        data={foods[0]?.recipe}
                        renderItem={({ item, index }) => (
                            <View style={styles.methodList}>
                                <View style={styles.methodPoint}>
                                </View>
                                <Text style={styles.ingredientsTextContent}>
                                    {item}
                                </Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )
    }

    const FooterSection = () => {
        return (
            <View style={styles.footerSection}>
                <TouchableOpacity
                    onPress={() => onPressUpdateHandle()}
                >
                    <View style={styles.updateButton}></View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => onPressRemoveHandle()}
                >
                    <View style={styles.deleteButton}></View>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <ScrollView style={styles.sectionContainer}>
            <ModalRating />
            <ModalRemoving />
            <ImageSection />
            <TopSection />
            <InfoSection />
            <IngredientSection />
            <MethodSection />
            <FooterSection />
            {/*             
            <Text style={styles.textTopHeader}>
                {item.name}
            </Text>
            <TouchableOpacity onPress={() => setShowRatingModal(true)}>
                <Text style={styles.textTopHeader}>
                    Rating: {rating}
                </Text>
            </TouchableOpacity>

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
            /> */}
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        //   justifyContent: 'center',
        //   alignItems: 'center',
        backgroundColor: 'white'//'#FFF3E6',
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
        borderRadius: 30,
    },
    pictureContent: {
        width: '100%',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000099'
    },
    removingModal: {
        width: 300,
        height: 300,
        backgroundColor: '#ffffff',
        borderRadius: 20,
    },
    removingTitle: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

    },
    backButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FF8C10',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 10,
        left: 10,
        elevation: 5,
    },
    belowPicture: {
        backgroundColor: 'white',
        height: 60,
        width: '100%',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        position: 'absolute',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        width: '10%',
        backgroundColor: '#A5A6A6',
        borderRadius: 30,
    },
    topSection: {
        margin: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rating: {
        width: 110,
        height: 45,
        borderRadius: 30,
        backgroundColor: '#FF8C10',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    textNameFood: {
        fontSize: 25,
        fontWeight: 'bold',
        flex: 1,
    },
    infoSection: {
        backgroundColor: 'white',//'black',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        backgroundColor: '#FF8C10',
        height: 120,
        width: 70,
        borderRadius: 50,
        padding: 5,
    },
    infoIconContainer: {
        width: 60,
        height: 60,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    infoTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ingredientSection: {
        margin: 10,
    },
    ingredientTextHeader: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    ingredientList: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    ingredientContentSection: {
        width: '100%',
        paddingLeft: 25,
    },
    point: {
        height: 10,
        width: 10,
        backgroundColor: '#FF8C10',
        borderRadius: 30,
        marginRight: 10,
    },
    methodList: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 5,
        paddingRight: 25,
    },
    methodPoint: {
        height: 10,
        width: 10,
        backgroundColor: '#FF8C10',
        borderRadius: 30,
        marginRight: 10,
        marginTop: 5,
    },
    footerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: 10,
    },
    updateButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#0066FF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#F10000',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Detail;