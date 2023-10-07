import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Input, Button,Icon } from "react-native-elements";
import Toast from "react-native-easy-toast";
import base64 from 'react-native-base64';

let data2=([])
let imagen1 = "";
let j =0;
let data = [];
// let calificacion = 0;
let validacion1 = false;

export default function DisplayConfirm(props) {
  const { setShowModal, setRecargar,info,usuario,puntos,status} = props;
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
    setCalificacion(0);
  }, [actu])

  const onSubmit = async () => {
    setError(null);
    if (usuario.puntos < puntos) {
      toastRef.current.show("No cuenta con los puntos necesarios, consiga mas, porfavor :(")
      setError("No cuenta con los puntos necesarios, consiga mas, porfavor :(");
    } else {
      setRecargar(true);
      ratingCompleted();
      setLoading(true);
          setLoading(false);
          setShowModal(false);

            const requestOptions2 = {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                idUsuario: usuario.idUsuario,
                usuario: usuario.usuario,
                contraseña:usuario.contraseña,
                status: usuario.status,
                imagen:usuario.imagen,
                puntos:usuario.puntos-puntos,
                lugares: usuario.lugares,
                recompensas: usuario.recompensas+1,
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

  const capturarDatos = (e, type) => {
    // setLoading(false)
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  function ratingCompleted(rating) {
    setCalificacion(rating);
  } 

  return (
    status ?
    <View style={styles.view}>
      <Text style={styles.datos}>¿Esta seguro de que desea canjear los puntos?</Text>
      
      <View style={styles.botones}>
      <Button
        title="Aceptar"
        containerStyle={styles.btnGuardar}
        buttonStyle={styles.btnStyle}
        onPress={() => onSubmit()}
        Loading={loading}
      />
      <Button
        title="Cancelar"
        containerStyle={styles.btnGuardar1}
        buttonStyle={styles.btnStyle1}
        onPress={() => setShowModal(false)}
        Loading={loading}
      />
      </View>
      <Toast ref={toastRef} position="center" opcacity={0.9} />
      </View> : 
    <View>
      <Text>Inicie sesion para poder canjear un premio, por favor</Text>
    </View>
  )
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
  botones:{
    flexDirection: "row",
  },
  datos:{
    fontWeight:'bold',
    fontSize:15,
    width: 340,
    marginVertical:10,
    textAlign:"center"
  },
  btnGuardar:{
    marginTop: 20,
    marginRight:20,
    width: "40%",
    marginVertical:10,
    borderRadius:10
  },
  btnGuardar1:{
    marginTop: 20,
    width: "40%",
    marginVertical:10,
    borderRadius:10
  },
  btnStyle: {
    backgroundColor: "#63bf0c",
    borderRadius:5
  },
  btnStyle1: {
    backgroundColor: "red",
    borderRadius:5
  },
});
