import Button from "@/components/button";
import CarritoCard from "@/components/carritoCard";
import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { useState } from "react"
import { View, StyleSheet, StatusBar, FlatList, Alert } from "react-native"


let articulesArray: any = [];
let canRead: boolean = false; 

export
const Carrito = () => {
  let [ articules, setArticules ] = useState<any>([]);
  const db = getFirestore();
  const auth = getAuth();
  return(
      <View>
          <View style={Styles.tabMenu}>
              <View style={Styles.panel}></View>
              <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
              <Button text="carrito" onPress={() => {router.push('/Carrito')}}/>
              <Button text="Exit" onPress={()=>{Alert.alert('Atención!', '¿Estas seguro de que quieres salir?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {router.push('/'); signOut(auth)}},
                ]);}}/>
          </View>
          <View style={Styles.View}>
            <FlatList style={Styles.FlatList} data={articulesArray} renderItem={({item}) =>(<CarritoCard articulo={item}></CarritoCard>)} numColumns={2}></FlatList>
          </View>
      </View>
  )
}

export
function anadirAlCarrito( art: Articulo ){
  articulesArray.push(art);
}

export
function borrarDelCarrito(idArray: number){
    articulesArray.splice(idArray, 1);
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
