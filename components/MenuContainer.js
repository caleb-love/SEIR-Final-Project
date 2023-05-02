import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default MenuContainer = ({ title, imageSrc, type, setType }) => {
    const handlePress = () => {
        setType(title.toLowerCase())
    }
    return (
        <TouchableOpacity className='items-center justify-center space-y-2' onPress={handlePress}>
            <View className={`w-24 h-24 p-2 shadow-sm rounded-full ${type === title.toLowerCase() ? 'bg-gray-200' : ''}`}
            >
                <Image source={imageSrc} className='w-24 h-24 object-contain'/>
            </View>
            <Text className='text-gray-900 text-xl font-semibold'>{title}</Text>
        </TouchableOpacity>
    )
}