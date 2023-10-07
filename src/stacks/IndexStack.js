import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Index from '../screens/Index'
import InformationPlaces from '../screens/InformationPlace'

const Stack = createStackNavigator();
let data = true;

export default function IndexStack() {
  return (
    <Stack.Navigator>
    {/* screenOptions={{headerShown:false}}> */}
      <Stack.Screen
      //Pantalla de el inicio
      name="index"
      data={data}
      component={Index}
      options={{title:"Inicio", headerTintColor:"black"}}
      />
      <Stack.Screen
      //Pantalla de la informacion de los servicios
      name="information"
      component={InformationPlaces}
      options={{title:"Lugar"}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})