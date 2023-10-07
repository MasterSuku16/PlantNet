import {StyleSheet,Text,View,TextInput,TouchableOpacity,Dimensions,Image,ScrollView,
  RefreshControl,} from "react-native";
  import React, { useEffect, useState, useRef, useCallback } from "react";
  import { Rating } from "react-native-ratings";
  import Carousel from "react-native-snap-carousel";
  import { Icon, ListItem, Button } from "react-native-elements";
  import MapView, { Marker } from "react-native-maps";
  import { map } from "lodash";
  import base64 from "react-native-base64";
  import Modal from '../components/Modal';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import DisplayConfirm from '../components/DisplayConfirm'
  import DisplayComment from '../components/ChangeDisplayComment'
  
  let data = [];
  let servicio = [];
  let data2 = [];
  let usuario = [];
  let puntos = "";

  export default function InformacionEmpresas(props) {
    const [iconPress, setIconPress] = useState(false);
    const { route } = props;
    const { params } = route;
    const { info } = params;
    const carousel = useRef();
    const [usuarioActivo, setusuarioActivo] = useState([])
    const [activeIndex, setActiveIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [renderComponent, setRenderComponent] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [recargar, setRecargar] = useState(false);
    const [nombre, setNombre] = useState(null)
    const [status, setStatus] = useState(false)
  
    useEffect(() => {
      onRefresh();
      setRecargar(false);
      getData();
      calificacion =0;
      servicio = [];
    }, [recargar]);
    
    const onRefresh = useCallback(() => {
      setRefreshing(true);
      // getComentario();
      setRecargar(false);
      calificacion =0;
      servicio = [];
      wait(1000).then(() => setRefreshing(false));
    }, []);

    const data3 = [
      {
        imgUrl: "https://picsum.photos/id/11/200/300",
      },
      {
        imgUrl: "https://picsum.photos/id/10/200/300",
      },
      {
        imgUrl: "https://picsum.photos/id/12/200/300",
      },
      {
        imgUrl: "https://picsum.photos/id/12/200/300",
      },
      {
        imgUrl: "https://picsum.photos/id/12/200/300",
      },
    ];
  
    const wait = (timeout) => {
      return new Promise((resolve) => setTimeout(resolve, timeout));
    };
  
    const [region, setRegion] = useState({
      //18.8502885,-99.2029242
      latitude: info.latitud,
      longitude: info.longitud,
      latitudeDelta: 0.0522,
      longitudeDelta: 0.0521,
    });
    const [market, setMarket] = useState({
      //info.latitude,info.longitude
      latitude: info.latitud,
      longitude: info.longitud,
    });

    const getData = async () => {
      try {
        let inicion = false;
        const value = await AsyncStorage.getItem('@session')
        const value2 = await AsyncStorage.getItem('@status')
        const value3 = await AsyncStorage.getItem('@puntos')

        console.log("value3: ", value3)
        puntos = value3;
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
            usuario = json.data;

            for(let i=0;i<usuario.length;i++){
              if(usuario[i].usuario === value && usuario[i].status){
                inicion = true
                setusuarioActivo(usuario[i]);
              }
              else{
              }
            }
      
          } catch (error) {
            console.error("Error de Empresas: ", error);
          }
          
        if(value !== null && value2 !== null) {
          if(inicion){
            setStatus(true);
            setNombre(value);
          }
          else {
            setStatus(false);
          }
        }

      } catch(e) {
        console.log("ta mal: ", e)
      }
    }

    const selectComponent = (key) => {
      switch (key) {
          case "displayInformation":
          setRenderComponent(
            <DisplayConfirm
              setShowModal={setShowModal}
              setRecargar={setRecargar}
              info={info}
              status= {status}
              usuario={usuarioActivo}
              puntos={info.puntos}
            />
          );
          setShowModal(true);
          // console.log("DisplayName");
          // console.log(props);
          break;
          case "displayComment":
          setRenderComponent(
            <DisplayComment
              setShowModal={setShowModal}
              setRecargar={setRecargar}
              info={info}
              status= {status}
              usuario={usuarioActivo}
              puntos={info.puntos}
            />
          );
          setShowModal(true);
          // console.log("DisplayName");
          // console.log(props);
          break;
  
        default:
          break;
      }
    };
  
    const menuOptions = generateOptions(selectComponent);

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={styles.container}
      >
        <View>
        <Text style={styles.titulo}>{info.nombre}</Text>
          <Text style={styles.puntos}>Puntos necesarios: {info.puntos}</Text>
          <View style={{ flex: 1, flexDirection: "row" }}>
          {/* {postExample2()} */}

            <Image
              style={styles.card}
            source={{ uri: base64.decode(info.imagen)}}
            />
          </View>
          <Text style={styles.descripcion}>{info.descripcion}</Text>

          <Rating
            style={styles.calificacion}
            readonly
            imageSize={25}
            startingValue={parseFloat(info.rating)}
            isDisabled={false}
            showRating={false}
            tintColor="#BAFF95"
          />
          <Text style={styles.puntos}>Puntos obtenidos: {usuarioActivo.puntos} </Text>
          <Button
        title="Canjear puntos"
        containerStyle={styles.btnPuntos}
        titleStyle={styles.btnStyle}
        onPress={()=> selectComponent('displayInformation')}
        />
        <Text style={styles.titulo}>UBICACION:</Text>
          <MapView style={styles.mapa} region={region}>
            <Marker
              key={1}
              coordinate={market}
              title={info.nombre}
              description={info.descripcion}
            ></Marker>
          </MapView>

          <Text style={styles.separacion}>Comentarios: </Text>
          <View style={{ marginTop: 20 }}>
          {/* {map(menuOptions, (menu, index) => (
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
            ))} */}
            {renderComponent && (
              <Modal isVisible={showModal} setIsVisible={setShowModal}>
                {renderComponent}
              </Modal>
            )}
          </View>
          {/* {console.log("los comentarios: ",servicio.servicios.id)} */}
          <View>
              {servicio.map((element, index) => (
                <View key={index}>
                  <TouchableOpacity>
                    <View style={styles.comentario}>
                  <Text style={styles.comentarioNombre}>
                    {element.usuarios.user}
                  </Text>
                  <Rating
                    readonly
                    imageSize={25}
                    startingValue={parseFloat(element.rating)}
                    isDisabled={false}
                    showRating={false}
                    tintColor="#F5F9F2"
                    style={styles.rating}
                  />
                  </View>
                  <Text style={styles.comentarioTitulo}>{element.titulo}</Text>
                  <Text style={styles.comentarioDescripcion}>
                    {element.descripcion}
                  </Text>
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
      </ScrollView>
    );
  }
  
  function generateOptions(selectComponent) {
    return [
      {
        title: "Comentarios:",
        iconType: "material-community",
        iconNameL: "account-circle",
        iconColor: "black",
        iconNameR: "chevron-right",
        onPress: () => selectComponent("displayComment"),
      },
    ];
  }
  
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
    crossorigin="anonymous"
  ></script>;
  
  const styles = StyleSheet.create({
    rating:{
      marginTop:30
    },
    btnPuntos:{
      marginTop:20,
      width:280,
      alignSelf:'center',
      marginVertical:5
    },
    menuItem: {
      borderBottomWidth: 1,
      borderBottomColor: '#e3e3e3',
      backgroundColor:"#A5F6B7",
    },
    btnStyle:{
      fontSize:25,
      padding:10
    },
    btnCarrito:{
      marginTop:20
    },
    comentario:{
      flexDirection: "row",
    },
    container: {
      flex: 1,
      width: "100%",
      backgroundColor:"#BAFF95",
    },
    titulo: {
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 10,
      alignSelf:"center"
    },
    descripcion: {
      fontSize: 17,
      marginTop: 15,
      marginVertical: 20,
      alignSelf:"center"
    },
    puntos: {
      fontSize: 21,
      marginTop: 10,
      alignSelf:"center"
    },
    tel:{
      fontSize: 15,
      marginTop: 1,
      marginVertical: 3,
    },
    calificacion: {
      backgroundColor: "#F5F9F2",
      marginBottom: 10,
      alignSelf:"center",
    },
    separacion: {
      marginTop: 30,
      color: "black",
      justifyContent: "flex-start",
      fontSize: 20,
      fontWeight: "bold",
    },
    mapa: {
      width: Dimensions.get("window").width,
      height: 200,
      marginTop: 10,
    },
    comentarioNombre: {
      marginTop: 30,
      fontSize: 14,
      fontWeight: "bold",
      width: 255,
    },
    comentarioTitulo: {
      fontSize: 13,
      marginTop: 4,
    },
    comentarioDescripcion: {
      fontSize: 12,
      marginTop: 4,

    },
    card: {
      // backgroundColor:"#fff",
      borderRadius: 10,
      height: 220,
      width: 340,
      padding: 40,
      marginTop: 30,
      marginHorizontal: 25,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1.5,
      borderColor: "#fcb823",
      flex: 1,
      flexDirection: "row",
    },
    comentarios: {
      backgroundColor: "#F5F9F2",
      padding: 26,
      borderRadius: 20,
      width: "95%",
      flexDirection: "row",
      marginTop: 15,
      justifyContent: "space-between",
    },
  });
