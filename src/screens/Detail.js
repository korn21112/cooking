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

const Stack = createStackNavigator();

function Detail() {

    const navigation = useNavigation();
    const route = useRoute();
    const { item } = route.params;
    // const [name, setName] = useState('');
    // const [age, setAge] = useState('')

    useEffect(() => {

    }, []);

    return (
        // <ScrollView>
        <ScrollView style={styles.sectionContainer}>
            <Text style={styles.textHeader}>
                {item.name}
            </Text>
            <View style={styles.pictureContent}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/food.jpg')}
                />
            </View>
            <View style={styles.ingredientContent}>
                <Text style={styles.textHeader}>
                    Ingredient
            </Text>
                <Text>
                    adfasdfasdfsdfaokdfkadofkadkflmdvpdokfsodfapodkf
                    adfadsfassadfasdfasdfasdafs
            </Text>
            </View>
            <View style={styles.methodContent}>
                <Text style={styles.textHeader}>
                    Method
            </Text>
                <Text>
                    adfasdfasdfsdfaokdfkadofkadkflmdvpdokfsodfapodkf
                    adfadsfassadfasdfasdfasdafs
            </Text>
            </View>
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
    textHeader: {
        margin: 10,
        fontSize: 40,
        // fontFamily:'DancingScript-Regular'
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