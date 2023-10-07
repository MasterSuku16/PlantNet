import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../screens/Profile'
import Register from '../screens/Register'
import UserOptions from '../screens/UserOptions'

const Stack = createStackNavigator();
let data = true;

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
      //Pantalla de perfil de usuario
      name="perfil"
      data={data}
      component={Profile}
      options={{title:"Perfil"}}
      />
      <Stack.Screen
      //Pantalla de registro de usuario
      name="registro"
      component={Register}
      options={{title:"Registro"}}
      />
      <Stack.Screen
      //Pantalla de registro de usuario
      name="userOption"
      component={UserOptions}
      options={{title:"Perfil"}}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})