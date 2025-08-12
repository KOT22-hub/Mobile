import { View, Text } from 'react-native'
import React from 'react'
import {Ionicons} from '@expo/vector-icons'
import COLORS from "../../constants/colors"

import {Tabs} from "expo-router"
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Tablayout() {
    const insets = useSafeAreaInsets()
  return (
    <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:COLORS.primary,headerTitleStyle:{
        color:COLORS.primary,
        fontWeight:"600"
    },headerShadowVisible:false,tabBarStyle:{backgroundColor:COLORS.cardBackground,borderTopWidth:1,borderTopColor:COLORS.border,padding:5,height:70,paddingBottom:insets.bottom }}}>
        <Tabs.Screen name='index' options={{title:"Home",tabBarIcon:({color,size})=>(<Ionicons name="home-outline" size={size} color={color}/>)}}/>
        <Tabs.Screen name='create' options={{title:"Create",tabBarIcon:({color,size})=>(<Ionicons name="add-circle-outline" size={size} color={color}/>)}}/>
        <Tabs.Screen name='profile' options={{title:"Profile",tabBarIcon:({color,size})=>(<Ionicons name="person-outline" size={size} color={color}/>)}}/>



    </Tabs>
  )
}