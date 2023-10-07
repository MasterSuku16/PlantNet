import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator,
  RefreshControl } from 'react-native'
import React, { useRef } from 'react'
import RegisterForm from '../components/account/RegisterForm'
import Toast from 'react-native-easy-toast'

export default function Register(props) {
  const toastRef = useRef()
  const {route} = props;
  const {params} = route;
  const {setRecargar2} = params;
  console.log("SI LO TRAE",setRecargar2)

  return (
    <ScrollView style={styles.containerView2}>
      <View style={styles.containerView}>
        <View style={styles.viewForm}>
          <RegisterForm toastRef={toastRef} setRecargar2={setRecargar2} />
        </View>
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  photoPerfil: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    margin: 20,
    marginTop:100
  },
  viewForm: {
    marginHorizontal: 40,
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: "#BAFF95",
    height: '100%',
  },  
  containerView2: {
    backgroundColor: "#BAFF95",
    height: '100%',
  },
})