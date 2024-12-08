import { router } from "expo-router";
import { FlatList, StatusBar, StyleSheet, View } from "react-native";
import Button from "@/components/button";
import ArticuloCard from "@/components/articuloCard";
import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";
import FilterBadge from "@/components/filterBadge";
import SearchBadge from "@/components/searchBadge";
const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articules, setArticules] = useState<any>([]);
  const db = getFirestore();
  let art: DocumentData[] = [];

  useEffect(() => {
    const datos = async () => {
        const fetchArticules = getDocs(collection(db, "articules"));
        (await fetchArticules).forEach((data) => {
          //setArticules([data.data()]);
          //console.log(articules);
          art.push({id: data.id, nombre: data.data().nombre, descripcion: data.data().descripcion, imagePath: data.data().imagePath, precio: data.data().precio, tags: data.data().tags});
          setArticules(art);
        })
    articules.forEach((element: any) => {
      console.log(element.imagePath)
    });
    };
    datos();
  }, [setArticules]);
  /*
  useEffect(()=>{
    const sorted = [...art].sort((a, b) => a.precio - b.precio);
    setArticules(sorted);
  }, [setArticules])
  */

  return (
    <View>
      <View style={Styles.tabMenu}>
        <View style={Styles.panel}></View>
        <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
        <Button text="carrito" onPress={() => {router.push('/Carrito')}}/>
        <Button text="Exit" onPress={()=>{}}/>
      </View>
      <View style={Styles.View}>
        <SearchBadge></SearchBadge>
        <FilterBadge></FilterBadge>
        <FlatList style={Styles.FlatList} data={articules} renderItem={({item}) =>(<ArticuloCard articulo={item}></ArticuloCard>)} numColumns={2}></FlatList>
      </View>
    </View>
)};
export default MainPage;

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
