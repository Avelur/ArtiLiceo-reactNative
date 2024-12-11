import Button from "@/components/button";
import CarritoCard from "@/components/carritoCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { View, StyleSheet, StatusBar, FlatList, Alert } from "react-native";

let articulesIds: [] = [];
let cantidad: number[] = [];

type articulo = {
  id: string,
  cantidad: number
}

export
const Carrito = () => {
  const db = getFirestore();
  useEffect(() => {
    const datos = () => {
        getDoc(doc(db, "carrito", "dankshum@gmail.com")).then(async (data) => {
        
        });
    };
    datos();
  });
  const auth = getAuth();
  return(
      <View>
          <View style={Styles.tabMenu}>
              <View style={Styles.panel}></View>
              <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
              <Button text="carrito" onPress={() => {router.push('/Carrito')}}/>
              <Button text="Salir" onPress={()=>{Alert.alert('Atención!', '¿Estas seguro de que quieres salir?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {router.push('/'); signOut(auth)}},
                ]);}}/>
          </View>
          <View style={Styles.View}>
            <FlatList style={Styles.FlatList} data={articulesIds} extraData={cantidad} renderItem={({item}) =>(<CarritoCard articuloId={item}></CarritoCard>)} numColumns={2}></FlatList>
          </View>
      </View>
  )
}

export
  async function anadirAlCarrito( articuloId: string ){
  let borrar = 0;
  const db = getFirestore();
  let i = 0;
  articulesIds.push(articuloId);
  cantidad.push(1);
  articulesIds.forEach((data) => {
    if(data == articuloId){
      let index = articulesIds.indexOf(data);
      //console.log(1);
      borrar++;
      if(borrar == 2){
        cantidad[index] = cantidad[index] + 1;
        articulesIds.pop();
        cantidad.pop();
        borrar = 0;
      }
    }else{
      //console.log(0);
    }
  });
  console.log(articulesIds.at(0));
  console.log(cantidad.at(0));
  const email: string = await AsyncStorage.getItem("userEmail")
  await setDoc(doc(db, "carrito", email), {
    cantidad,
    articulesIds
  });
}

export
  async function borrarDelCarrito( articuloId: string ){
  const db = getFirestore();
  articulesIds.forEach((data) => {
    if(data == articuloId){
      let index = articulesIds.indexOf(data);
      //console.log(1);
      if(cantidad[index] != 0){
        cantidad[index] = cantidad[index] - 1;
      }
      
    }else{
      //console.log(0);
    }
  });
  
  const email: string = await AsyncStorage.getItem("userEmail")
  await setDoc(doc(db, "carrito", email), {
    cantidad,
    articulesIds
  });
}

const Styles = StyleSheet.create({
    mainView: {
      
    },
    tabMenu:{
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: StatusBar.currentHeight || 0,
      color: 'white'
    },
    View:{
      margin:20,
      alignSelf: 'center'
    },
    ExitView:{
      width: 250,
      height: 100
    },
    panel:{
      flex: 2,
      padding: 10,
      backgroundColor:'white'
    },
    FlatList: {
      alignSelf: 'center'
    }
})
export default Carrito;
