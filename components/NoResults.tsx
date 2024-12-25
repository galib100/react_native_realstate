import { View, Text, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const NoResults = () => {
    return (
        <View className='flex items-center my-5 '>
            <Image source={images.noResult} className='w-11/12 h-80' resizeMode='contain' />
            <Text className='text-2xl font-rubik-bold text-black-00 mt-5'>We could Not find any Results</Text>
        </View>
    )
}

export default NoResults