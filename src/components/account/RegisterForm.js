import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input, Button, Icon } from 'react-native-elements'
import { isEmpty, size } from 'lodash'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import Loading from '../Loading'

export default function RegisterForm(props) {
  //console.log(props);
  const navigation = useNavigation()
  const { toastRef,setRecargar2 } = props
  const [showPass, setShowPass] = useState(false)
  const [showPassRepeat, setShowPassRepeat] = useState(false)
  const [formData, setFormData] = useState(defaultFormValues())
  const [loading, setloading] = useState(false)
  const [dataUser, setDataUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  let user = false;
  let register = ([]);
  const [recargar, setRecargar] = useState(false);
  console.log("recargar", setRecargar2)
  useEffect(() => {
    getUser();
    onRefresh();
    setRecargar(false);
    setFormData("")
  }, [recargar])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUser();
    setFormData("")
    wait(1000).then(() => setRefreshing(false));
  }, [recargar]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

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
      // console.log("USEEEEER: ", json.data)
    } catch (error) {
      console.error("Error de usuario: ", error);
    }
  };
  
  const onSubmit = () => {
    getUser();
    // console.log("Useeeeer: ",user)
    if (isEmpty(formData.user) ||isEmpty(formData.password) || isEmpty(formData.passwordRepeat)
    || isEmpty(formData.edad)
    ) {
      toastRef.current.show('todos los campos son necesarios')

    } else if (isEmpty(formData.user)) {
      toastRef.current.show('todos los campos son necesarios')
    } else if (size(formData.password) < 6) {
      toastRef.current.show('La contraseña debe tener al menos 6 caracteres')
    } else if (formData.password !== formData.passwordRepeat) {
      toastRef.current.show('Las contraseñas deben ser iguales')
    }
    else {
      for(let i=0;i<dataUser.length;i++){
        // user =dataUser[i];
        if (formData.user === dataUser[i].user) {
          toastRef.current.show(
            "Usuario registrado, vuelva a intentarlo, por favor"
          );
          user = false;
        }
        else{
          user = true;
        }
      }

      if(user) {
        postExample();
        
        setRecargar2(true);
        setloading(false);
        setRecargar(true);
        toastRef.current.show(
          "Usuario registrado correctamente, inicie sesion con su nueva cuenta"
        );
      }

      setloading(false);
    }
  }

  const getEmpresas = async () => {
    try {
      const response = await fetch(`http://${global.ip}/api/companies/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error("Error de Empresas: ", error);
    }
  };

  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      usuario: formData.user,
      contraseña: formData.password,
      status: false,
      puntos: 0,
      lugares:0,
      recompensas:0,
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

   const capturarDatos = (e, type) => {
     setFormData({ ...formData, [type]: e.nativeEvent.text })
   }

  return (
    <View style={styles.formContainer}>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}>
      <Text style={styles.title}>Crea tu nueva cuenta: </Text>

      <Text style={styles.datos}>Usuario: </Text>
      <Input
        onChange={(e) => capturarDatos(e, 'user')}
        value={formData.user}
        placeholder="Nombre de Usuario"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Text style={styles.datos}>Edad: </Text>
      <Input
        onChange={(e) => capturarDatos(e, 'edad')}
        value={formData.edad}
        placeholder="Edad"
        containerStyle={styles.inputForm}
        rightIcon={
          <Icon type="material-community" name="at" iconStyle={styles.icon} />
        }
      />
      <Text style={styles.datos}>Contraseña: </Text>
      <Input
        onChange={(e) => capturarDatos(e, 'password')}
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        value={formData.password}
        secureTextEntry={showPass ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPass ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPass(!showPass)}
          />
        }
      />
      <Text style={styles.datos}>Contraseña: </Text>
      <Input
        onChange={(e) => capturarDatos(e, 'passwordRepeat')}
        placeholder="Repetir contraseña"
        containerStyle={styles.inputForm}
        password={true}
        value={formData.passwordRepeat}
        secureTextEntry={showPassRepeat ? false : true}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassRepeat ? 'eye-outline' : 'eye-off-outline'}
            iconStyle={styles.icon}
            onPress={() => setShowPassRepeat(!showPassRepeat)}
          />
        }
      />
      <Button
        title="Registrar"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btnRegister}
        onPress={() => onSubmit()}
      />
      {/* <Loading isVisible={loading} text="Creando Cuenta" />  */}
      </ScrollView>
    </View>
  )
}

function defaultFormValues() {
  return {
    user: '',
    edad: '',
    password: '',
    passwordRepeat: '',
  }
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 30,
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  title:{
    textAlign:'center',
    fontWeight:'bold',
    fontSize:20,
  },
  datos:{
    fontSize:17,
    marginTop: 50
  },
  inputForm: {
    width: '100%',
    marginTop: 10,
  },
  icon: {
    color: '#c1c1c1',
  },
  btnContainer: {
    marginTop: 50,
    width: '95%',
  },
  btnRegister: {
    backgroundColor: '#5f7f7a',
  },
})