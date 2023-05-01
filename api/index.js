import axios from 'axios';
import Constants from 'expo-constants'

export const getPlaceData = async (bl_lat, bl_lng, tr_lat, tr_lng, type) => {
    try {
        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
            {
                params: {
                    bl_latitude: bl_lat ? bl_lat : '-34.01798633029149',
                    tr_latitude: tr_lat ? tr_lat : '-34.01528836970849',
                    bl_longitude: bl_lng ? bl_lng : '151.0111575697085',
                    tr_longitude: tr_lng ? tr_lng : '151.0138555302915',
                    limit: '3',
                    currency: 'AUD',
                    open_now: 'true',
                    lunit: 'km',
                    lang: 'en_US'
                },
                headers: {
                    'content-type': 'application/octet-stream',
                    'X-RapidAPI-Key': Constants.manifest.extra.XRapidAPIKey,
                    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
                }
            }
        )

        return data
    } catch (error) {
        return null
    }
}

