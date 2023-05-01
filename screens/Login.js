import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView } from 'react-native'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import * as AuthSession from 'expo-auth-session'
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

// web: 182665401528-q28knbe49pl3pbmirf4r0j9948cehom5.apps.googleusercontent.com
// secret: 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
// iOS: 182665401528-spk73iqsg2bo8md3dri2jud6fvru31mv.apps.googleusercontent.com

WebBrowser.maybeCompleteAuthSession()



export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [accessToken, setAccessToken] = useState(null)
    const [user, setUser] = useState(null)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '182665401528-q28knbe49pl3pbmirf4r0j9948cehom5.apps.googleusercontent.com',
        iosClientId: '182665401528-spk73iqsg2bo8md3dri2jud6fvru31mv.apps.googleusercontent.com',
    })

    const onHandleLogin = () => {
        if (email !== '' && password !== '') {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Login success'))
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
                Authorization: `Bearer ${accesstoken}`
            }
        })
        const userInfo = await response.json()
        setUser(userInfo)
    }

    

    return (
        <View className='flex-1 bg-gray-900'>
            <Image source={require('../assets/backImage.jpg')} className={'w-full h-340 absolute top-0 object-cover'} />
            <SafeAreaView className='flex-1 justify-center mx-30'>
                <Text className='text-7xl self-center mb-60'>Dinder</Text>
                <View className='bg-white opacity-90 rounded-3xl'>
                    <Text className='text-3xl font-bold text-gray-900 self-center pb-6'>Let's get Eating!</Text>
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
                        <TouchableOpacity className='bg-gray-900 text-white h-14 rounded-lg flex justify-center items-center mt-10 mx-20' onPress={onHandleLogin}>
                            <Text className='font-bold text-white text-lg'>Log In</Text>
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
                            <Text className='text-gray-500 font-semibold text-sm'>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                                <Text className='text-gray-900 font-semibold text-sm'> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </SafeAreaView>
            <StatusBar barStyle='light-content' />
        </View>
    )
}