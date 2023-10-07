import {StyleSheet,Text,View,TouchableOpacity,Image, ScrollView,RefreshControl} from "react-native";
import React, { useState, useEffect, useRef, useCallback } from "react";
import base64 from "react-native-base64";
import { Icon } from "react-native-elements";
//MAXIMO 65 CARACTERES
let info = ([]);
let info2 = ([]);
export default function Service(props) {
  const { navegacion} = props;
  const [iconPress, setIconPress] = useState(false);
  const [dataCategorias, setDataCategorias] = useState([]);
  const [subCategoria, setSubCategoria] = useState([])
  const [dataLugares, setDataLugares] = useState([]);
  const [actu, setActu] = useState(false)
  const [renderComponent, setRenderComponent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // const [info, setInfo] = useState([]);
  
  useEffect(() => {
    getLugares();
  }, []);
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setActu(false);
    getLugares();
    wait(1000).then(() => setRefreshing(false));
  }, [actu]);

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const getLugares = async () => {
    try {
      const response = await fetch(`http://${global.ip}:8080/api/lugares/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const json = await response.json();

      setDataLugares(json.data);
      return json.data;
    } catch (error) {
      console.error("Error en el Servicio: ", error);
    }
  };

  function RenderImage(props) {
    const { dataLugares} = props;
    return (
      <View>
      <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
      <View>
        {dataLugares.map((element, index) => (
        
        <View>
            <TouchableOpacity
              style={styles.empresas}
              onPress={() =>
                navegacion.navigate("information",{ info: element }) //{ info: element }
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
              </View>
            </TouchableOpacity>
          </View>
        ))} 

      </View>
      </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />}
      >
    <View style={styles.container}>

        <RenderImage dataLugares={dataLugares}/>
    </View>
    </ScrollView>
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
  busqueda: {
    backgroundColor: "#F5F9F2",
    padding: 15,
    borderRadius: 20,
    width: "90%",
    flexDirection: "row",
    marginTop: 15,
    alignSelf:'center'
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
  viewCategorias:{
    flex:1,
    backgroundColor:'white'
  }
});
