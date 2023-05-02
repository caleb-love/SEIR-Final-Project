import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()


export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '182665401528-q28knbe49pl3pbmirf4r0j9948cehom5.apps.googleusercontent.com',
        iosClientId: '182665401528-spk73iqsg2bo8md3dri2jud6fvru31mv.apps.googleusercontent.com',
    })

    const onHandleSignup = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Signup success'))
                .catch((err) => Alert.alert('Login error', err.message))
        }
    }

    useEffect(() => {
        if (response?.type === 'success')
            setAccessToken(response.authentication.accessToken)
        accessToken && fetchUserInfo()
    }, [response, accessToken])

    async function fetchUserInfo() {
        let response = await fetch('https://googleapis.com/userinfo/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        const userInfo = await response.json()
        setUser(userInfo)
    }

    return (
        <View className='flex-1 bg-gray-900'>
            <Image source={require('../assets/backImage.jpg')} className={'w-full h-340 absolute top-0 object-cover'} />
            <SafeAreaView className='flex-1 justify-center mx-30'>
                <Text className='text-7xl self-center mb-60'>Twogether.</Text>
                <View className='bg-white opacity-90 rounded-3xl'>
                    <Text className='text-3xl font-bold text-gray-900 self-center pb-6'>Sign Up!</Text>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <TextInput
                            className='bg-gray-100 h-14 mb-5 mx-10 rounded-lg text-lg px-3'
                            placeholder='Enter email'
                            autoCapitalize='none'
                            keyboardType='email-address'
                            textContentType='emailAddress'
                            autoFocus={true}
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                        />
                        <TextInput
                            className='bg-gray-100 h-14 mb-5 mx-10 rounded-lg text-lg px-3'
                            placeholder='Enter password'
                            autoCapitalize='none'
                            autoCorrect={false}
                            secureTextEntry={true}
                            textContentType='password'
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <TouchableOpacity className='bg-gray-900 text-white h-14 rounded-lg flex justify-center items-center mt-10 mx-20' onPress={onHandleSignup}>
                            <Text className='font-bold text-white text-lg'>Sign Up</Text>
                        </TouchableOpacity>

                        {/* Google Login */}
                        <View>
                            {user === null &&
                                <>
                                    <TouchableOpacity
                                        disabled={!request}
                                        onPress={() => {
                                            promptAsync()
                                        }}
                                        className='bg-red-600 text-white h-14 rounded-lg flex justify-center items-center mt-10 mx-20'>
                                        <Text className='font-bold text-white text-lg'>Google</Text>
                                    </TouchableOpacity>
                                </>
                            }
                        </View>

                        <View className='my-5 flex flex-row items-center self-center'>
                            <Text className='text-gray-500 font-semibold text-sm'>I'm already a Member! </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text className='text-gray-900 font-semibold text-sm'> Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
            <StatusBar barStyle='light-content' />
        </View>
    )
}