import { StyleSheet, Text, View, ScrollView, RefreshControl} from 'react-native';
import React, {useState, useEffect, useCallback, useRef } from 'react';
import { ListItem, Avatar } from 'react-native-elements';
import { map } from 'lodash';
import Modal from '../components/Modal';
import ChangeDisplayName from '../components/ChangeDisplayName';
import { useNavigation } from '@react-navigation/native';
import ChangeDisplayPassword from '../components/ChangeDisplayPassword'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import base64 from 'react-native-base64';

let uri2 = "";
let dataUser = ([]);
let datos=([]);

export default function UserOptions(props) {
  const navigation = useNavigation()
  const {infoLogin, setRecargar, toastRef,setCambio,setNombreCambio,userInfo} = props;
  const [imagenPres, setImagenPres] = useState("")
  const [validacionImg, setValidacionImg] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null)
  const [data, setData] = useState(false)
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUser();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUser();
    setData(false)
  }, [data])

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
      dataUser = json.data;
    } catch (error) {
      console.error("Error de usuario: ", error);
    }

    if(infoLogin.imagen===null){
      setValidacionImg(false);
    }
    else{
      setValidacionImg(true);
      setImagenPres(infoLogin.imagen)
    }
  };

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const selectComponent = (key) => {
    switch (key) {
      case 'displayName':
        setRenderComponent(
          <ChangeDisplayName
            toastRef={toastRef}
            // setReloadUserInfo={setReloadUserInfo}
            setCambio={setCambio}
            setRecargar={setRecargar}
            infoLogin={infoLogin}
            setNombreCambio={setNombreCambio}
          />,
        )
        setShowModal(true)
        break
      case 'password':
        setRenderComponent(
          <ChangeDisplayPassword
              // displayName={displayName}
              // setShowModal={setShowModal}
              toastRef={toastRef}
              // setReloadUserInfo={setReloadUserInfo}
              // user={user}
              setRecargar={setRecargar}
              infoLogin={infoLogin}
            />,
          )
        setShowModal(true)
        break;
        case 'logout':

          for(let i=0;i<dataUser.length;i++){
            console.log("dataUser.length: ", dataUser.length)
            if(dataUser[i].status && dataUser[i].usuario === infoLogin.usuario){
              datos = dataUser[i];
              console.log("el dataaaa: ", datos)
            }
          }
          const requestOptions = {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            usuario: datos.usuario,
            idUsuario: datos.idUsuario,
            imagen: datos.imagen,
            contraseña: datos.contraseña,
            status: false,
            puntos: datos.puntos,
            lugares: datos.lugares,
            recompensas: datos.recompensas,
            }),
          };
        
          const postExample = async () => {
            try {
              await fetch(
                `http://${global.ip}:8080/api/usuarios/`,
                requestOptions
              ).then((response) => {
                response.json().then((data) => {
                });
              });
            } catch (error) {
              console.error(error);
            }
          };
          postExample();
          navigation.navigate("perfil")
          setRecargar(true);
        break
      default:
        break
    }
  }

  const changeAvatar = async () => {
    
    const resultPermission = await Permissions.askAsync(Permissions.CAMERA)

    const resultPermissionCameran = resultPermission.permissions.camera.status
    if (resultPermissionCameran == 'denied') {
      toastRef.current.show('Es necesario otorgar permisos')
    } else {
      
      toastRef.current.show('Seleccione una imagen, por favor')
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      })

      if (result.cancelled) {
        toastRef.current.show('No haz seleccionado niguna imagen')
      } else {
        // getUser();

        console.log("imagen: ",result.uri)
        uri2 = base64.encode(result.uri);

        const requestOptions = {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            contraseña: infoLogin.contraseña,
            idUsuario: infoLogin.idUsuario,
            imagen: uri2,
            lugares: infoLogin.lugares,
            puntos: infoLogin.puntos,
            recompensas: infoLogin.recompensas,
            status: infoLogin.status,
            usuario: infoLogin.usuario,
          }),
        };
      

           const postExample = async () => {
          try {
            await fetch(
              `http://${global.ip}:8080/api/usuarios/`,
              requestOptions
            ).then((response) => {
              response.json().then((data) => {
              });
            });
          } catch (error) {
            console.error(error);
          }
        };

        postExample();
        setRecargar(true);
          // getUser();
          console.log("LA PERRA IMAGEN",infoLogin.imagen)
          setImagenPres(infoLogin.imagen);
          setValidacionImg(true);
          setData(true)
          setRecargar(true);
      }
    }
  }

  const menuOptions = generateOptions(selectComponent)
  //console.log(menuOptions)

  return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        style={styles.datos}
      >
        <View style={styles.viewUserInfo}>
    <Avatar
      onEditPress={() => changeAvatar()}
      rounded
      size="xlarge"
      showEditButton
      containerStyle={styles.userAvatar}
      source= {validacionImg ? {uri: base64.decode(imagenPres)} : require('../../assets/logo.jpg')}/>
    </View>

      <Text style={styles.nombre}>{userInfo.usuario}</Text>
      <Text style={styles.puntos}>Puntos obtenidos: {userInfo.puntos}</Text>
      <Text style={styles.puntos}>Lugares limpiados: {userInfo.lugares}</Text>
      <Text style={styles.puntos}>Recompensas reclamadas: {userInfo.recompensas}</Text>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameL,
            color: menu.iconColor,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameR,
            color: menu.iconColor,
          }}
          containerStyle={styles.menuItem}
          onPress={() => menu.onPress()}
        />
      ))}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setShowModal}>
          {renderComponent}
        </Modal>
      )}
      </ScrollView>
  )
}

function generateOptions(selectComponent) {
  return [
    {
      title: 'Cambiar nombre y apellidos',
      iconType: 'material-community',
      iconNameL: 'account-circle',
      iconColor: 'black',
      iconNameR: 'chevron-right',
      onPress: () => selectComponent('displayName'),
    },
    {
      title: 'Cambiar Contraseña',
      iconType: 'material-community',
      iconNameL: 'lock-reset',
      iconColor: 'black',
      iconNameR: 'chevron-right',
      onPress: () => selectComponent('password'),
    },
    {
      title: 'Cerrar Sesion',
      iconType: 'material-community',
      iconNameL: 'logout',
      iconColor: 'black',
      iconNameR: 'chevron-right',
      onPress: () => selectComponent('logout'),
    },
  ]
}

const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#e3e3e3',
    backgroundColor:"#A5F6B7",
  },
  nombre: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    marginBottom:20
  },
  puntos: {
    fontSize: 21,
    marginTop: 10,
    marginVertical:20,
    textAlign: "center",
  },
  correo: {
    fontSize: 15,
    marginTop: 20,
    textAlign: "center",
    marginBottom:100
  },
  viewUserInfo: {
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor:"#BAFF95",
    paddingTop: 30,
    paddingBottom: 30,
  },
  userAvatar: {
    height: 150,
    width: 150,
    backgroundColor:"black"
  },
  
})