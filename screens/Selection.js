import { View, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Entypo, AntDesign } from '@expo/vector-icons';

export default Selection = ({ route }) => {
    const navigation = useNavigation()

    const data = route?.params

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    console.log(data)
    return (
        <SafeAreaView className='flex-1 bg-gray-300 relative'>
            <ScrollView className='flex-1 px-4 py-6'>
                <View className='relative bg-gray-100 shadow-lg'>
                    <Image
                        source={{
                                uri:
                                    data?.photo?.images?.large?.url ?
                                        data?.photo?.images?.large?.url :
                                        'https://placehold.co/100x100.jpg'
                            }}
                        className='w-full h-72 object-cover rounded-2xl'
                    />
                    <View className='absolute flex-row inset-x-0 top-5 justify-between px-6'>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        className='w-10 h-10 rounded-md items-center justify-center bg-gray-100'>
                        <Entypo name="arrow-long-left" size={24} color="red" />
                        </TouchableOpacity>

                        <TouchableOpacity className='w-10 h-10 rounded-md items-center justify-center bg-gray-500'>
                        <AntDesign name="hearto" size={24} color="white" />
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}