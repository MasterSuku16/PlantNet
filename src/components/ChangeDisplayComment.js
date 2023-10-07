import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";
import { Rating, AirbnbRating } from "react-native-ratings";
import Toast from "react-native-easy-toast";

let data2=([])
let usuario = ([]);
let guardar = []
let j =0;
let data = [];
let servicio= [];
let resultado = 0;
export default function ChangeDisplayComment(props) {
  //192.168.100.6
  const { setShowModal, setRecargar,info, nombre,status} = props;
  const toastRef = useRef();
  const [calificacion, setCalificacion] = useState(null)
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues())
  // const [usuario, setUsuario] = useState([])

  useEffect(() => {
    getUser();
    getComentario();
    console.log("resultado: ",resultado)
    resultado=0;
  }, [])
  
  const getComentario = async () => {
    try {
      const response = await fetch(
        `http://${global.ip}:8080/api/comentarios/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const json = await response.json();
      //console.log("AQUI VA LA INFO: ",json.data)
      data = json.data;

      for(let i=0;i<data.length;i++){
        // console.log("entro al for")
        if(data[i].premios.idPremios === info.idPremios){
          j++;
          resultado = resultado + data[i].rating;
          servicio[j] = data[i]
        }
      }
      j = 0;
      resultado =  (resultado/(servicio.length-1))
      console.log("el data: ",resultado)
    } catch (error) {
      console.error("Error de Comentario: ", error);
    }
  };

  const onSubmit = () => {
    setError(null);
    if (isEmpty(formData.titulo || formData.descripcion)) {
      setError("Es necesario llenar todos los campo");
    } else {
      getUser();
      ratingCompleted();
      setLoading(true);
          // getRating(); //rating
          setLoading(false);
          setShowModal(false);
          setRecargar(true);
          postExample();
          getComentario();
          // postExample2();
    }
  };

  
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      servicios: info,
      usuarios: usuario,
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      rating: calificacion,
    }),
  };

  const postExample = async () => {
    try {
      await fetch(
        `http://${global.ip}:8080/api/comentarios/`,
        requestOptions
      ).then((response) => {
        response.json().then((data) => {
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://${global.ip}:8080/api/usuarios/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const json = await response.json();
      data2 = json.data;

      for(let i=0;i<data2.length;i++){
        if(data2[i].user == nombre){
          usuario =data2[i];
        }
        else{
        }
      }

    } catch (error) {
      console.error("Error de Empresas: ", error);
    }
  };


  const capturarDatos = (e, type) => {
    setLoading(false)
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  function ratingCompleted(rating) {
    setCalificacion(rating);
  }

  return (
    status ? <View style={styles.view}>
      <Text>Inserte un comentario: </Text>
      <Rating
            style={styles.calificacion}
            imageSize={25}
            onFinishRating={ratingCompleted}
            startingValue={parseFloat(0)}
            isDisabled={false}
            showRating={false}
            tintColor="#BAFF95"
            // onChange={(event, newValue) => {
            //     setValue(newValue);}}
          />
      <Input
        placeholder="Titulo"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "pencil",
          color: "#c2c2c2",
        }}
        onChange={(e) => capturarDatos(e, 'titulo')}
        errorMessage={error}
      />
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
      <Button
        title="Guardar comentario"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={() => onSubmit()}
        Loading={loading}
      />
      <Toast ref={toastRef} position="center" opcacity={0.9} />
    </View> : <View>
      <Text>Inicie sesion para poder comentar :D</Text>
      </View>
  );
}

function defaultFormValues() {
  return {
    titulo: '',
    descripcion:''
  }
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnStyle: {
    backgroundColor: "#fcb823",
  },
});
