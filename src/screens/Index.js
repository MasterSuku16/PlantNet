import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator} from 'react-native'
import React, {useState, useEffect} from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import Places from '../components/Places';
import { Button, Divider, Icon, Input, Avatar} from 'react-native-elements'

export default function Index(props) {
  const navegacion = useNavigation();
  
  return (
    <KeyboardAwareScrollView style={styles.servicio}>
    <Places navegacion={navegacion} icono={false}/>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  boton:{
    marginTop:650,
    marginLeft:250,
    position:'absolute',
    width:130,
    // bottom:10,
    height:50,
    // alignItems:'center',
    padding:10,
    borderRadius:20,
    shadowColor:'#000',
    shadowOpacity:0.4,
    shadowOffset:{width:0, height:2},
    elevation:5,  
    alignSelf:'stretch'
},
servicio:{
  backgroundColor:"#BAFF95"
}
})