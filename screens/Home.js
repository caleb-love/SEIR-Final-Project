import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Text, ActivityIndicator, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { signOut, auth } from 'firebase/auth'
import { getPlaceData } from '../api'
import { Entypo } from '@expo/vector-icons'
import { Dinder, Restaurants, Attractions, Hotels, NotFound, ChatGPT, SignOut, Chat } from '../assets'
import * as Animatable from 'react-native-animatable'
import MenuContainer from '../components/MenuContainer'
import IdeaContainer from '../components/IdeaContainer'
import Constants from 'expo-constants'


const Home = () => {

    const navigation = useNavigation()

    const [type, setType] = useState('restaurants')
    const [isLoading, setIsLoading] = useState(true)
    const [mainData, setmainData] = useState([])
    const [bl_lat, setBl_lat] = useState(null)
    const [bl_lng, setBl_lng] = useState(null)
    const [tr_lat, setTr_lat] = useState(null)
    const [tr_lng, setTr_lng] = useState(null)

    const onSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out successfully.')
            })
            .catch(error => {
                console.log('Error logging out: ', error)
            })
    }

    useEffect(() => {
        setIsLoading(true)
        getPlaceData(bl_lat, bl_lng, tr_lat, tr_lng)
            .then((data) => {
                setmainData(data)
                setInterval(() => {
                    setIsLoading(false)
                }, 2000)
            })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

    return (

        <SafeAreaView className='flex-1'>
            {/* Header */}
            <View className='flex-row justify-around'>
                <TouchableOpacity
                    className='m-5'
                    onPress={onSignOut}
                >
                    <Image
                        source={SignOut}
                        className='w-8 h-8'
                    />
                </TouchableOpacity>

                {/* Logo */}
                <Animatable.View
                    className='flex-row px-6 space-x-2 justify-center items-center'
                    animation={'fadeIn'}
                    easing={'ease-in-out'}
                >
                    <View className='w-24 h-24 rounded-full items-center'>
                        <Image
                            source={Dinder}
                            className='w-28 h-28'
                        />
                    </View>
                </Animatable.View>

                <TouchableOpacity
                    className='m-5'
                    onPress={() => navigation.navigate('ChatGPT')}
                >
                    <Image
                        source={ChatGPT}
                        className='w-8 h-8'
                    />
                </TouchableOpacity>

            </View>
            {/* Tagline */}

            <View>
                {/* Google Search Box */}
                <View className='flex-row items-center mx-4 rounded-xl py-1 px-4 shadow-lg mt-4 '>
                    <GooglePlacesAutocomplete
                        GooglePlacesDetailsQuery={{ fields: 'geometry' }}
                        placeholder='Find places to eat!'
                        fetchDetails={true}

                        onPress={(data, details = null) => {
                            console.log(details?.geometry?.viewport)
                            setBl_lat(details?.geometry?.viewport?.southwest?.lat)
                            setBl_lng(details?.geometry?.viewport?.southwest?.lng)
                            setTr_lat(details?.geometry?.viewport?.northeast?.lat)
                            setTr_lng(details?.geometry?.viewport?.northeast?.lng)
                        }}
                        query={{
                            key: Constants.manifest.extra.GoogleMapsAPI,
                            language: 'en',
                            types: 'restaurant',
                        }}
                    />
                </View>

            </View>

            {/* Selecting restaurant genre */}
            <ScrollView>
                <View className="flex-row items-center justify-between px-8 mt-8">
                    <MenuContainer
                        key={'restaurants'}
                        title={'Restaurants'}
                        imageSrc={Restaurants}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={'attractions'}
                        title={'Activities'}
                        imageSrc={Attractions}
                        type={type}
                        setType={setType}
                    />
                    <MenuContainer
                        key={'hotels'}
                        title={'Hotels'}
                        imageSrc={Hotels}
                        type={type}
                        setType={setType}
                    />
                </View>

                {isLoading ? (
                    <View className='flex-1 items-center justify-center'>
                        <ActivityIndicator size='large' color='gray' />
                    </View>
                ) : (
                    <View>
                        <View className='flex-row items-center justify-between px-10 mt-8'>
                            <Text className='text-gray-900 text-xl font-bold'>Date Ideas</Text>

                            <TouchableOpacity className='flex-row items-center justify-center space-x-2'>
                                <Text className='text-gray-900 text-l font-bold'>Look</Text>
                                <Entypo name="arrow-long-right" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-8 flex-row items-center justify-evenly flex-wrap">
                            {mainData?.length > 0 ? (
                                <>
                                    {mainData?.map((data, i) => (
                                        <IdeaContainer
                                            key={i}
                                            imageSrc={
                                                data?.photo?.images?.medium?.url ?
                                                    data?.photo?.images?.medium?.url :
                                                    'https://placehold.co/100x100.jpg'

                                            }
                                            title={data?.name}
                                            location={data?.location_string}
                                            data={data}
                                        />
                                    ))}
                                </>
                            ) : (
                                <>
                                    <View className='items-center space-y-5'>
                                        <Text className='text-2xl text-gray-900 font-semibold'>
                                            No Places Found!
                                        </Text>
                                        <Image
                                            source={NotFound}
                                            className='object-contain'
                                            resizeMode='contain'
                                        />
                                    </View>

                                </>
                            )}
                        </View>
                    </View>
            )}
            </ScrollView>

            {/* Chat Bubble */}
            <View className='bottom-0 justify-right items-right'>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Chat')}
                    className='rounded-full h-24 w-24 justify-center items-center shadow-lg bottom-0'
                >
                    <Animatable.View
                        animation={'pulse'}
                        easing={'ease-in-out'}
                        iterationCount={'infinite'}
                    >
                        <Image
                            source={Chat}
                            className='w-16 h-16'
                        />
                    </Animatable.View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Home