import { StyleSheet, Text, View, ScrollView, RefreshControl, useFocusEffect, alert} from 'react-native'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Login from './Login'
import Toast from 'react-native-easy-toast'
import UserOptions from '../screens/UserOptions'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil(props) {
  const navigation = useNavigation()
  const toastRef = useRef();
  const [login, setLogin] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [cambio, setCambio] = useState(false)
  const [loading, setloading] = useState(true)
  const [nombreCambio, setNombreCambio] = useState('')
  let user = ([]);
  let infoLogin = ([]);
  const [reloadUserInfo, setReloadUserInfo] = useState(false)
  const [displayName, setdisplayName] = useState(null)
  const [email, setEmail] = useState(null)
  const [photoURL, setPhotoURL] = useState(null)
  const [uid, setUid] = useState(null)
  const [dataUser, setDataUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [recargar, setRecargar] = useState(false);
  const [nombre, setNombre] = useState(null)
  const [status, setStatus] = useState(false)
  //---------------CARGA DE DATOS-------------
  //Se ejecuta al entrar a una vista por primera vez
  useEffect(() => {
    onRefresh();
    getUser();
    getData();
    setRecargar(false);
  }, [recargar])
  
  //funcion para "recargar los datos que queramos"
  const onRefresh = useCallback(() => {
    getUser();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  //funcion que se usa en "onRefresh" para darle un "tiempo de carga"
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  //---------------------------------------------------


  //--------------------- SERVICIOS ------------------------------
  const getUser = async () => {
    try {
      const response = await fetch(`http://${global.ip}:8080/api/usuarios/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();

      setDataUser(json.data);
    } catch (error) {
      console.error("Error de usuario: ", error);
    }
  }
  //--------------------------------------------------------------

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@session')
      const value2 = await AsyncStorage.getItem('@status')
      // console.log("value: ",value)
      // console.log("value2: ",value2)
      if(value !== null && value2 !== null) {
        setStatus(true);
        setNombre(value);
      }
    } catch(e) {
      console.log("ta mal: ", e)
    }
  }
  //--------------------- VALIDACIONES ------------------------------
  const RenderProfile = async () => {
    getData();
    for(let i=0;i<dataUser.length;i++){
      //console.log("dataUser: ",dataUser[i].usuario)
      // console.log("nombre: ",nombre)
      if(dataUser[i].usuario === nombre){
        const info = [];
        info[0] = dataUser[i]

          if(info[0].status){

              infoLogin = dataUser[i];
              user = dataUser[i];
          }

      }
      else if(cambio) {
        if(dataUser[i].status && (nombreCambio === dataUser[i].usuario)){
          infoLogin = dataUser[i];
          user = dataUser[i];
        }
      }
      else{
      }

      if (!user.status) {
        setLogin(false)
      } else {
        // console.log("EL USEEER: ",user)
        setLogin(true)
        
        setUserInfo(user)
        setdisplayName(user.userName)
        setEmail(user.email)
        setPhotoURL(user.userPhoto)
        setUid(user.idUser)
    
        setloading(false)
      }

      // console.log("la infooo2: ",info)
      // console.log("la infooo3: ",dataUser)
      }
  setReloadUserInfo(false)
}

function RenderProfile2() {
  //console.log("se seteo el login: ",login)
  RenderProfile()
  if (login) { 
    return (
      <View style={styles.vista} >
        <UserOptions
          toastRef={toastRef}
          infoLogin={infoLogin}
          setReloadUserInfo={setReloadUserInfo}
          displayName={displayName}
          email={email}
          userInfo={userInfo}
          photoURL={photoURL}
          uid={uid}
          setCambio={setCambio}
          setNombreCambio={setNombreCambio}
          setRecargar={setRecargar}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
        {/* <Loading isVisible={loading} text={loadingText} /> */}
      </View>
    )
  } else {
    return (
      <View style={styles.vista} >
      <Login navigation={navigation} toastRef={toastRef} userLogin={false} setRecargar={setRecargar}/>
      {/* <Toast ref={toastRef} position="center" opacity={0.9} /> */}
      </View>
    )
  }
}
//-------------------------------------------------------------------

return(
  <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        style={styles.vista}
      >
  <RenderProfile2/>
  <Toast ref={toastRef} position="center" opacity={0.9}/>
  </ScrollView>
)

}

const styles = StyleSheet.create({
  vista:{
    backgroundColor:"#BAFF95"
  }
})