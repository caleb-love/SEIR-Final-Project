import { View, Text, FlatList, TouchableOpacity, TextInput, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants'

import axios from 'axios'

const ChatGPT = () => {
    const [data, setData] = useState([])
    const [textInput, setTextInput] = useState('')
    const OpenAiAPIKey = Constants.manifest.extra.OpenAiAPIKey
    const apiUrl = 'https://api.openai.com/v1/completions'

    const handleSend = async () => {
        try {
            const prompt = textInput
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                model: 'text-davinci-002',
                max_tokens: 1024,
                temperature: 0.5,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OpenAiAPIKey}`
                }
            })
            const text = response.data.choices[0].text
            setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': text }])
            setTextInput('')
        } catch (error) {
            console.error(error)
            alert('An error occurred while fetching data. Please make your own decision for dinner.')
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 30,  marginBottom: 20, marginTop: 70 }}>Answer my Questions</Text>
            <FlatList
                styles={{ backgroundColor: 'mistyrose', width: '90%', margin: 10 }}
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <Text style={{  color: item.type === 'user' ? 'green' : 'red' }}>{item.type === 'user' ? 'Me: ' : 'DindAI: '}</Text>
                        <Text className='text-sm'>{item.text}</Text>
                    </View>
                )}

            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <TextInput
                    style={{ height: 24, marginBottom: 10, borderWidth: 1, borderColor: 'black', borderRadius: 10, width: '100%' }}
                    value={textInput}
                    onChangeText={text => setTextInput(text)}
                    placeholder='Ask me for Dinner Ideas'
                />
                <TouchableOpacity
                    style={{ backgroundColor: '#00f', borderRadius: 10, width: '100%', height: 40, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}
                    onPress={handleSend}>
                    <Text style={{ color: '#fff' }}>Let's Go!</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        </SafeAreaView>
    )
}

export default ChatGPT