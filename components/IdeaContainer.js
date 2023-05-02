import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default IdeaContainer = ({ imageSrc, title, location, data }) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('Selection', { param: data })}
        className='rounded-md border border-gray-300 space-y-2 px-3 py-2 shadow-md bg-gray-200 w-44 my-2'>
            <Image
                source={{ uri: imageSrc }}
                className='w-full h-40 rounded-md object-cover'
            />

            {title ? (
                <>
                    <Text className='text-gray-900 text-lg font-bold'>
                        {title?.length > 15 ? `${title.slice(0, 15)}..` : title}
                    </Text>

                    <View className='flex-row items-center space-x-1'>
                        <FontAwesome name="map-marker" size={20} color="gray" />
                        <Text className='text-gray-900 text-sm font-bold'>
                            {location?.length > 15 ? `${title.slice(0, 15)}..` : location}
                        </Text>
                    </View>
                </>
            ) : (
            <></>
            )}
        </TouchableOpacity>
    )
}