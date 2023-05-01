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
            const prompt = textInput;
            const response = await axios.post(apiUrl, {
                prompt: prompt,
                model: 'text-davinci-002',
                max_tokens: 1024,
                temperature: 1,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OpenAiAPIKey}`
                }
            });
            const text = response.data.choices[0].text;
            const chars = text.split('');
            let newText = '';
            for (let i = 0; i < chars.length; i++) {
                newText += chars[i];
                setData([...data, { type: 'user', 'text': textInput }, { type: 'bot', 'text': newText }]);
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            setTextInput('');
        } catch (error) {
            console.error(error);
            alert('An error occurred while fetching data. Please make your own decision for dinner.');
        }
    }


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1, marginTop: 50, marginBottom: 20 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Answer my Questions</Text>
            </View>
            <View style={{ flex: 5, width: '100%', paddingHorizontal: 20 }}>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
                            <Text style={{ fontWeight: 'bold', color: item.type === 'user' ? '#4CAF50' : '#F44336' }}>{item.type === 'user' ? 'Me: ' : 'DindAI: '}</Text>
                            <Text style={{ marginLeft: 10 }}>{item.text}</Text>
                        </View>
                    )}
                />
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, width: '100%', paddingHorizontal: 20 }}>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        style={{ height: 50, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#333', borderRadius: 10, paddingHorizontal: 20, marginBottom: 10 }}
                        value={textInput}
                        onChangeText={text => setTextInput(text)}
                        placeholder='Ask me for Dinner Ideas'
                        placeholderTextColor='#777'
                    />
                    <TouchableOpacity
                        style={{ backgroundColor: '#F44336', borderRadius: 10, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}
                        onPress={handleSend}>
                        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Let's Go!</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatGPT