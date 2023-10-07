import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import IndexStack from '../stacks/IndexStack'
import ProfileStack from '../stacks/ProfileStack'
import RewardStack from '../stacks/RewardStack'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
//Instancia para poder crear los screens de navegacion
//192.168.100.6/192.168.100.1     192.168.100.72     192.168.100.31
//IP necesaria para los servicios
global.ip = "192.168.43.89";
const BottomTab = createBottomTabNavigator();

export default function Navegation() {

  return (
      //Dentro van los screens de navegacion
    <NavigationContainer>
        <BottomTab.Navigator 
        // Define en que screen va a inicar la aplciacion
            initialRouteName='index'
                tabBarOptions={{
                    inactiveTintColor:"#6C6F6C",
                    inactiveBackgroundColor:"#B7F1B2",
                    activeTintColor:"#B6FFAE",
                    activeBackgroundColor: "#2DA921",
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOption(route, color)
                })}>
        {/* Todas las screens para navegar */}
        <BottomTab.Screen
          name='index'
          // data={data}
          component={IndexStack}
          options={{ title: "Inicio"}}
        />
        <BottomTab.Screen
          name='reward'
          // data1={data1}
          component={RewardStack}
          options={{ title: "Recompensas" }}
        />
        <BottomTab.Screen
          name='perfil'
          // data3={data3}
          component={ProfileStack}
          options={{ title: "Perfil" }}
        />
        </BottomTab.Navigator>
    </NavigationContainer>

      )
      
}
//Funcion para asignar los iconos a la navegacion
function screenOption(route, color) {
    let icono;
    switch (route.name) {
        case "index":
            icono = "home"
            break;
        case "reward":
            icono = "gift"
            break;
        case "perfil":
            icono = "account"
            break;
        default:
            break;
    }
    return(
        <Icon type="material-community" name={icono} size={35} color={color}></Icon>
    )
}