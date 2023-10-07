import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Reward from '../screens/Reward'
import InformationReward from '../screens/InformationReward';

const Stack = createStackNavigator();
let data = true;

export default function TopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      //Pantalla de top de servicios
      name="ranking"
      data={data}
      component={Reward}
      options={{title:"Premios"}}
      />
      <Stack.Screen
      //Pantalla de informacion de los top
      name="informationReward"
      component={InformationReward}
      options={{title:"Recompensa"}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})