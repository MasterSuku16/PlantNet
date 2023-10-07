import {StyleSheet,Text,View,TouchableOpacity,Image, ScrollView,RefreshControl} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import base64 from "react-native-base64";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//MAXIMO 65 CARACTERES
let info = ([]);
let info2 = ([]);
let premios = []
export default function Service(props) {
  const navegacion = useNavigation();
  const [iconPress, setIconPress] = useState(false);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [subCategoria, setSubCategoria] = useState([])
  const [dataPremios, setDataPremios] = useState([]);
  const [actu, setActu] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // const [info, setInfo] = useState([]);
  
  useEffect(() => {
    getPremios();
  }, []);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPremios();
    setActu(false);
    wait(1000).then(() => setRefreshing(false));
  }, [actu]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const getPremios = async () => {
    try {
      const response = await fetch(`http://${global.ip}:8080/api/premios/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();

      setDataPremios(json.data);

    } catch (error) {
      console.error("Error en el Servicio: ", error);
    }
  };

  function RenderImage(props) {
    const { dataPremios} = props;
    return (
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        style={styles.container1}
      >
        {dataPremios.map((element, index) => (
        
        <View key={index} style={styles.container1}>
            <TouchableOpacity
              style={styles.empresas}
              onPress={() =>
                navegacion.navigate("informationReward",{ info: element }) //{ info: element }
              }
            >
              <View >
                <Image
                  style={styles.logo}
                  source={{uri: base64.decode(element.imagen)}}
                />
              </View>
              <View>
                <Text style={styles.name}>
                  {element.nombre}
                </Text>
                <Text style={styles.description}>
                  {element.descripcion}
                  </Text>
                  <Text style={styles.puntos}>
                  Puntos necesarios: {element.puntos}
                  </Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    );
  }

  return (
    <KeyboardAwareScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
        style={styles.container}
      >
        <RenderImage dataPremios={dataPremios}/>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  img: {
    width: 100,
    height: 50,
    borderWidth: 1,
    borderColor: "red",
  },
  icon:{
    marginRight:20
  },
  container: {
    margin: 10,
    backgroundColor:"#BAFF95",
  },
  container1: {
    backgroundColor:"#BAFF95",
  },
  viewImage: {
    marginRight: 15,
  },
  logo: {
    marginTop:20,
      width: 160,
      height: 130,
      borderWidth: 1,
      borderColor: "red",
      marginRight:10,
      alignItems:'center'
  },
  empresas: {
    backgroundColor: "#D6FCC1",
    padding: 5,
    borderRadius: 20,
    borderWidth:2,
    borderColor:"#CBCFC9",
    width: "100%",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    height:200
  },
  placeholder:{
    width: 180,
    fontSize:15,
    opacity:0.5
  },
  description: {
    marginTop: 5,
    width: 180,
    fontSize:20
  },
  puntos: {
    marginTop: 15,
    width: 180,
    fontSize:17
  },
  name: {
    width: 180,
    fontSize:30
  },
  imagen: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: "#c35547",
    resizeMode: "contain",
    margin: 6,
  },
  categorias:{
    fontSize:18,
    fontWeight:'700',
    padding:10
  },
});
