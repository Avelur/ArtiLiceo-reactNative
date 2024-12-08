import Button from "@/components/button";
import CarritoCard from "@/components/carritoCard";
import { router } from "expo-router";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react"
import { View, StyleSheet, StatusBar, FlatList } from "react-native"


let articulesArray: any = [];
let i = 0;
let canRead: boolean = false; 

export
const Carrito = () => {
let [ articules, setArticules ] = useState<any>([]);
  const db = getFirestore();
  return(
      <View>
          <View style={Styles.tabMenu}>
              <View style={Styles.panel}></View>
              <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
              <Button text="carrito" onPress={() => {router.push('/Carrito')}}/>
              <Button text="Exit" onPress={()=>{}}/>
          </View>
          <View style={Styles.View}>
            <FlatList style={Styles.FlatList} data={articulesArray} renderItem={({item}) =>(<CarritoCard articulo={item} idArray={i}></CarritoCard>)} numColumns={2}></FlatList>
          </View>
      </View>
  )
}

export
function anadirAlCarrito( art: Articulo ){
  console.log("anadir");
  articulesArray.push({art, i});
  i++;
}

export
function borrarDelCarrito( art: Articulo, idArt: number ){
  console.log("anadir");
  articulesArray.push(art);
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


