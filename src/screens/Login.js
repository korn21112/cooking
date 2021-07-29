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
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

function Login() {
    // // Set an initializing state whilst Firebase connects
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const signInByEmail = () => {
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                console.log('User account created & signed in!');
                navigation.replace('BottomTabNavigator');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
        <View style={styles.sectionContainer}>
            <TextInput
                style={styles.input}
                placeholder='Enter Email'
                onChangeText={(value) => setEmail(value)}
            />
            <TextInput
                style={styles.input}
                placeholder='Enter Password'
                secureTextEntry={true}
                onChangeText={(value) => setPassword(value)}
            />
            <Button
                title='login'
                color="#FF8C10"
                onPress={() => { signInByEmail() }}
            />
            <TouchableOpacity
                onPress={() => { navigation.navigate('SignUp') }}
            >
                <Text style={styles.textSignUp}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        //   justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF3E6',
    },
    textHeader: {
        margin: 10,
        fontSize: 40,
        textAlign: 'center',
        fontFamily: 'DancingScript-Regular'
    },
    textSignUp: {
        fontSize: 15,
        color: '#FF8C10',
        margin: 20,
    },
    input: {
        width: 300,
        borderWidth: 1,
        borderColor: '#555',
        borderRadius: 10,
        backgroundColor: '#ffffff',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 30,
        marginBottom: 10,
    },
    logo: {
        width: 200,
        height: 200,
        margin: 20,
    },
});

export default Login;