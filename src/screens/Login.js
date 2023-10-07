import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useEffect, useCallback} from 'react';
import { Button, Divider, Icon, Input, Avatar } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import { isEmpty, size } from 'lodash'
import AsyncStorage from '@react-native-async-storage/async-storage';

let user = false;
let final = "";

export default function Login(props) {
  const navigation = useNavigation();
  // const toastRef = useRef();
  const { userLogin, setRecargar,toastRef} = props;
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());
  let login = [];
  const [refreshing, setRefreshing] = useState(false);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);
  //---------------CARGA DE DATOS-------------

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUser();
    // onSubmit();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  //-------------------------------------------

  //-------------------- SERVICIOS -------------------
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
  };
  //--------------------------------------------------

  //-------------------- VALIDACIONES -------------------
  const onSubmit = () => {
    getUser();
    // console.log("USUARIOS: ", dataUser);
    //!userLogin
    if (isEmpty(formData.user) || isEmpty(formData.password)) {
      toastRef.current.show('todos los campos son necesarios')
    }
    else if(size(formData.password) < 6){
      toastRef.current.show('La contraseña debe tener al menos 6 caracteres')
    }
     else {
      let user=false;

      for (let i = 0; i < dataUser.length; i++) {
        if (
          formData.user !== dataUser[i].usuario ||
          formData.password !== dataUser[i].contraseña
        ) {
          toastRef.current.show(
            'Usario y/o contraseña incorrecto, vuelva a intentarlo, por favor'
          )
        } else if (
          formData.user === dataUser[i].usuario &&
          formData.password === dataUser[i].contraseña
        ) {
          user = true;
          login = dataUser[i];
        }
      }
      if (user) {
        const requestOptions = {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            usuario: login.usuario,
            idUsuario: login.idUsuario,
            imagen: login.imagen,
            contraseña: login.contraseña,
            status: true,
            puntos: login.puntos,
            lugares: login.lugares,
            recompensas: login.recompensas,
          }),
        };

        const postExample = async () => {
          try {
            await fetch(
              `http://${global.ip}:8080/api/usuarios/`,
              requestOptions
            ).then((response) => {
              response.json().then((data) => {
                console.log("el usuario: ",data)

                const storeData = async (value) => {
                  try {
                    const usuario = data.data.usuario;
                    const session = data.data.status;
                    const punto = data.data.puntos;
                    final = final + punto;
                    let validacion = "";
                    if(session) {
                      validacion = "true"
                    }
                    else {
                      validacion = null
                    }

                    await AsyncStorage.setItem('@session', usuario)
                    await AsyncStorage.setItem('@status', validacion)
                    await AsyncStorage.setItem('@puntos', final)
                    const value = await AsyncStorage.getItem('@session')
                    const value2 = await AsyncStorage.getItem('@status')
                    console.log("holaa: ",value)
                    return value;
                  } catch (e) {
                    console.log("error en AsyncStorage: ", e)
                  }
                }
                
                storeData();

                console.log("holaa: ",value);
              });
            });
          } catch (error) {
            console.error(error);
          }
        };
        postExample();
        toastRef.current.show('Se a iniciado sesion correctamente')
        navigation.navigate("perfil", { info: login });
        setRecargar(true);
      }
    }
  };

  const capturarDatos = (e, type) => {
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  function defaultFormValues() {
    return {
      user: "",
      password: "",
    };
  }
  //-----------------------------------------------------

  //-------------------- NAVEGACION -------------------
  function CrearCuenta() {
    const navegacion = useNavigation();
    return (
      <Text style={styles.textRegister}>
        ¿Aún no tienes cuenta?{" "}
        <Text
          style={styles.btnRegister}
          onPress={() => navegacion.navigate("registro", {setRecargar2:setRecargar})}
        >
          Regístrate
        </Text>
      </Text>
    );
  }
  //---------------------------------------------------

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={styles.container}
        // idUsers={login.idUser}>
      >
        <Avatar
          style={styles.photoPerfil}
          // onEditPress={() => console.log('changeAvatar()')}
          rounded
          size="xlarge"
          containerStyle={styles.userAvatar}
          source={require("../../assets/logo.jpg")}
          // source={require("../../assets/pollo_loco.jpg")}
        />

        <Input
          onChange={(e) => capturarDatos(e, "user")}
          placeholder="Nombre de usuario"
          containerStyle={styles.input}
          rightIcon={
            <Icon
              type="material-community"
              name={"account"}
              iconStyle={styles.icon}
            />
          }
        />
        <Input
          onChange={(e) => capturarDatos(e, "password")}
          placeholder="Contraseña"
          containerStyle={styles.input}
          password={true}
          secureTextEntry={showPass ? false : true}
          rightIcon={
            <Icon
              type="material-community"
              name={showPass ? "eye-outline" : "eye-off-outline"}
              iconStyle={styles.icon}
              onPress={() => setShowPass(!showPass)}
            />
          }
        />
        <Divider style={styles.divider} />
        <CrearCuenta />
        <Button
          title="Iniciar Sesion"
          containerStyle={styles.containerBtn}
          buttonStyle={styles.btnLogin}
          onPress={() => onSubmit()}
        />
        <Toast ref={toastRef} position="center" opacity={0.9} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: "center",
    backgroundColor: "#BAFF95",
    height: "100%",
  },
  //   img: {
  //     width: '100%',
  //     height: 150,
  //     marginTop: 20,
  //     marginBottom: 20,
  //   },
  input: {
    width: "100%",
    marginTop: 30,
  },
  icon: {
    color: "#c1c1c1",
  },
  divider: {
    backgroundColor: "black",
    marginTop: 40,
    marginVertical: 30,
  },
  containerBtn: {
    margin: 20,
    width: "90%",
  },
  btnLogin: {
    backgroundColor: "#5f7f7a",
  },
  textRegister: {
    marginTop: 15,
    marginEnd: 15,
    marginVertical: 50,
    marginHorizontal: 10,
    alignSelf: "center",
  },
  btnRegister: {
    color: "green",
    margin: 40,
    fontWeight: "bold",
  },
  photoPerfil: {
    height: 150,
    width: 150,
    alignSelf: "center",
    margin: 20,
    marginTop: 80,
  },
});
