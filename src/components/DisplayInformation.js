import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Input, Button,Icon } from "react-native-elements";
import { isEmpty } from "lodash";
import { Rating, AirbnbRating } from "react-native-ratings";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Toast from "react-native-easy-toast";
import base64 from 'react-native-base64';

let data2=([])
let imagen1 = "";
let j =0;
let data = [];
// let calificacion = 0;
let validacion1 = false;

export default function ChangeDisplayNameForm(props) {
  const { setShowModal, setRecargar,info,usuario, status} = props;
  const toastRef = useRef();
  // const [data, setData] = useState([])
  const [calificacion, setCalificacion] = useState(0)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actu, setActu] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues())
  // const [usuario, setUsuario] = useState([])

  console.log("datos: ", usuario)
  useEffect(() => {
    setActu(false)
    getLugares();
    setCalificacion(0);
  }, [actu])
  
  const getLugares = async () => {
    try {
      const response = await fetch(
        `http://${global.ip}:8080/api/lugares/${info.id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const json = await response.json();
      data = json.data;
      console.log("AQUI VA LA INFO: ",data.length)

    } catch (error) {
      console.error("Error de Comentario: ", error);
    }
  };

  const onSubmit = async () => {
    setError(null);
    if (isEmpty(formData.descripcion) || imagen1==="" || calificacion===0) {
      setError("Es necesario llenar todos los campo");
    } else {
      setRecargar(true);
      ratingCompleted();
      setLoading(true);
          setLoading(false);
          setShowModal(false);

          const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              descripcion: formData.descripcion,
              rating: calificacion,
              imagenEvi:imagen1,
              lugares: info,
              usuarios: usuario,
            }),
          };

            try {
              await fetch(
                `http://${global.ip}:8080/api/reseñas/`,
                requestOptions
              ).then((response) => {
                response.json().then((data) => {
                });
              });
            } catch (error) {
              console.error("Error de favoritoo: ", error);
            }

            const requestOptions2 = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                idUsuario: usuario.idUsuario,
                usuario: usuario.usuario,
                contraseña:usuario.contraseña,
                status: usuario.status,
                imagen:usuario.imagen,
                puntos:usuario.puntos+info.puntos,
                lugares: usuario.lugares+1,
                recompensas: usuario.recompensas,
              }),
            };
  
              try {
                await fetch(
                  `http://${global.ip}:8080/api/usuarios/`,
                  requestOptions2
                ).then((response) => {
                  response.json().then((data) => {
                  });
                });
              } catch (error) {
                console.error("Error de favoritoo: ", error);
              }

            setRecargar(true)
            validacion1 = false;
            imagen1 = ""
            setActu(true)
    }
  };

  const imagen = async () => {
    
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
        console.log("LA PERRA IMAGEN 1")
        toastRef.current.show('No haz seleccionado niguna imagen')
      } else {

          imagen1 = base64.encode(result.uri)
          validacion1 = true;
          console.log("validacion1: ",validacion1)
          setActu(true)
      }
    }
  }
  
  const capturarDatos = (e, type) => {
    // setLoading(false)
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  function ratingCompleted(rating) {
    setCalificacion(rating);
  }

  return (
    status ? <View style={styles.view}>
      <Text style={styles.datos}>Para dar como valido este lugar, debe de agregar una descripcion
        de lo que se hizo y subir una imagen como evidencia, porfavor: </Text>
      <Input
        placeholder="Descripcion"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "cursor-text",
          color: "#c2c2c2",
        }}
        onChange={(e) => capturarDatos(e, 'descripcion')}
        errorMessage={error}
      />
      {/* {console.log("imagen1: ",imagen1)} */}
      <TouchableOpacity
      onPress={() => imagen()}>
        <Image
        style={styles.photoPerfil}
        containerStyle={styles.userAvatar}
        source= {validacion1 ? {uri: base64.decode(imagen1)} : require('../../assets/camara.png')}
        />
      </TouchableOpacity>

      <Text style={styles.datos}>Tambien puede calificar el lugar,
      dependiendo de que le parecio:</Text>
      <Rating
            style={styles.calificacion}
            imageSize={25}
            onFinishRating={ratingCompleted}
            startingValue={parseFloat(0)}
            isDisabled={false}
            showRating={false}
            ratingBackgroundColor="#CECFCC"
            type="custom"
            // onChange={(event, newValue) => {
            //     setValue(newValue);}}
          />

      <Button
        title="Guardar informacion"
        containerStyle={styles.btnGuardar}
        buttonStyle={styles.btnStyle2}
        onPress={() => onSubmit()}
        Loading={loading}
      />
      <Toast ref={toastRef} position="center" opcacity={0.9} />
    </View> : 
    <View>
      <Text>Inicie sesion para poder aceptar un lugar, por favor</Text>
    </View>
  );
}

function defaultFormValues() {
  return {
    descripcion:''
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  datos:{
    fontWeight:'bold',
    fontSize:15,
    width: 340,
    marginVertical:10,
    textAlign:"center"
  },
  calificacion:{
    marginLeft:12
  },
  photoPerfil: {
    height: 110,
    width: 130,
    marginBottom:10,
    marginTop:10,
  },
  input: {
    marginBottom: 10,
  },
  btnFoto: {
    marginTop: 20,
    width: "95%",
    marginVertical:10
  },
  btnGuardar:{
    marginTop: 20,
    width: "95%",
    marginVertical:10
  },
  btnStyle: {
    backgroundColor: "#fcb823",
  },
  btnStyle2: {
    backgroundColor: "#63bf0c",
  },
});
