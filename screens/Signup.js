import React, { useState } from 'react'
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from 'react-native'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'

export default function Signup({ navigation }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onHandleSignup = () => {
        if (email !== '' && password !== '') {
            createUserWithEmailAndPassword(auth, email, password)
                .then(() => console.log('Signup success'))
                .catch((err) => Alert.alert('Login error', err.message))
        }
    }

    return (
        <View className='flex-1 bg-opacity-60 bg-gray-900'>
            <Image source={require('../assets/backImage.jpg')} className='w-full h-96 absolute top-0 object-cover' />
            <SafeAreaView className='flex-1 justify-center mx-30'>
                <Text className='text-3xl font-bold text-gray-900 self-center pb-24'>Sign Up</Text>
                <TextInput
                    className='bg-gray-100 h-14 mb-20 text-base rounded-lg p-3'
                    placeholder='Enter email'
                    autoCapitalize='none'
                    keyboardType='email-address'
                    textContentType='emailAddress'
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    className='bg-gray-100 h-14 mb-20 text-base rounded-lg p-3'
                    placeholder='Enter password'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType='password'
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity className='bg-gray-900 h-14 rounded-lg justify-center items-center mt-40' onPress={onHandleSignup}>
                    <Text className='font-bold text-white text-lg'> Sign Up</Text>
                </TouchableOpacity>
                <View className='mt-20 flex flex-row items-center self-center'>
                    <Text className='text-gray-600 font-semibold text-sm'>I'm already a member! </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text className='text-gray-400 font-semibold text-sm'> Log In</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle='light-content' />
        </View>
    )
}