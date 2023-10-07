import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button, Icon } from "react-native-elements";
import { isEmpty } from "lodash";

export default function ChangeDisplayNameForm(props) {
  //console.log(props)
  const { displayName, setShowModal, toastRef, setReloadUserInfo, user, setRecargar,
    infoLogin } =
    props;
  const [newDisplayName, setNewDisplayName] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState(defaultFormValues())

  const onSubmit = () => {
    setError(null);
    console.log(newDisplayName);
    if (isEmpty(formData.contraseña)) {
      setError("Es necesario llenar el campo");
    } else if (formData.contraseña === infoLogin.password) {
      setError("La contraseña deben ser diferentes");
    } else {
      setLoading(true);
          //console.log("OK")
          postExample();
          // setLoading(false);
          // setReloadUserInfo(true);
          // setShowModal(false);
          setRecargar(true);
          toastRef.current.show("se ha cambiado la contraseña exitosamente");
    }
  };

  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contraseña: formData.contraseña,
      idUsuario: infoLogin.idUsuario,
      imagen: infoLogin.imagen,
      lugares: infoLogin.lugares,
      puntos: infoLogin.puntos,
      recompensas: infoLogin.recompensas,
      status: infoLogin.status,
      usuario: infoLogin.usuario,
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

    function defaultFormValues() {
      return {
        contraseña: infoLogin.password,
      }
    }

  const capturarDatos = (e, type) => {
    setLoading(false)
    setFormData({ ...formData, [type]: e.nativeEvent.text })
  }

  return (
    <View style={styles.view}>
      <Text>Cambiar Contraseña</Text>
      <Input
        placeholder="********"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPass ? false : true}
        rightIcon={
          <Icon
              type="material-community"
              name={showPass ? 'eye-outline' : 'eye-off-outline'}
              iconStyle={styles.icon}
              onPress={() => setShowPass(!showPass)}
            />
        }
        onChange={(e) => capturarDatos(e, 'contraseña')}
        errorMessage={error}
        defaultValue={infoLogin.contraseña || ""}
      />
      <Button
        title="Cambiar contraseña"
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