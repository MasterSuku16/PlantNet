import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { isEmpty } from "lodash";

export default function ChangeDisplayNameForm(props) {
  //console.log(props)
  const {
    setCambio,
    toastRef,
    setNombreCambio,
    setRecargar,
    infoLogin,
  } = props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues());

  const onSubmit = () => {
    setError(null);
    if (isEmpty(formData.nombre)) {
      setError("Es necesario llenar el campo")
    } else if (formData.nombre === infoLogin.usuario) {
      setError("Los nombres deben ser diferentes")
    } else {
      setLoading(true);
      console.log("Nombre: ", formData.nombre)
      const update = {
        displayName: newDisplayName,
      };
      //console.log("OK")
      postExample();
      setCambio(true);
      setNombreCambio(formData.nombre)
      setRecargar(true);
      toastRef.current.show("se ha cambiado el nombre exitosamente")
    }
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contraseña: infoLogin.contraseña,
      idUsuario: infoLogin.idUsuario,
      imagen: infoLogin.imagen,
      lugares: infoLogin.lugares,
      puntos: infoLogin.puntos,
      recompensas: infoLogin.recompensas,
      status: infoLogin.status,
      usuario: formData.nombre,
    }),
  };

    const postExample = async () => {
      try {
        await fetch(`http://${global.ip}:8080/api/usuarios/`, requestOptions).then(
          (response) => {
            response.json().then((data) => {
            });
          }
        );
      } catch (error) {
        console.error(error);
      }
    };

  const capturarDatos = (e, type) => {
    setLoading(false);
    setFormData({ ...formData, [type]: e.nativeEvent.text });
  };

  function defaultFormValues() {
    return {
      nombre: infoLogin.usuario,
    };
  }

  return (
    <View style={styles.view}>
      <Text>Cambiar nombre</Text>
      <Input
        placeholder="Nombre y apellidos"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        onChange={(e) => capturarDatos(e, "nombre")}
        errorMessage={error}
        defaultValue={infoLogin.usuario || ""}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnStyle}
        onPress={() => onSubmit()}
        Loading={loading}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:"#BAFF95",
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btnStyle: {
    backgroundColor:"#44D138",
  },
});
