import { router } from "expo-router";
import { FlatList, StatusBar, StyleSheet, TextInput, View, Text, Alert } from "react-native";
import Button from "@/components/button";
import ArticuloCard from "@/components/articuloCard";
import { useEffect, useState } from "react";
import { collection, DocumentData, getDocs, getFirestore } from "firebase/firestore";
import FilterBadge from "@/components/filterBadge";
import { getAuth, signOut } from "firebase/auth";
import { authEmail } from ".";
import AsyncStorage from "@react-native-async-storage/async-storage";
const MainPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [articules, setArticules] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const db = getFirestore();
  let art: DocumentData[] = [];
  let index: number = 0;
  const auth = getAuth();
  useEffect(() => {
    const datos = async () => {
        const fetchArticules = getDocs(collection(db, "articules"));
        (await fetchArticules).forEach((data) => {
          //setArticules([data.data()]);
          //console.log(articules);
          art.push({id: data.id, nombre: data.data().nombre, descripcion: data.data().descripcion, imagePath: data.data().imagePath, precio: data.data().precio, tags: data.data().tags, index: index});
          setArticules(art);
          index++;
        })
        const email = await AsyncStorage.getItem("userEmail");
        console.log(email);
    articules.forEach((element: any) => {
      console.log(element.imagePath)
      });
      setIsLoading(false);
    };
    datos();
  }, [setArticules]);

  useEffect(()=>{
    setArticules(searchText);
  }, [setArticules]);


  if(isLoading){
    return(
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{alignSelf:'center', fontSize: 24, fontWeight: 'bold'}}>Loading...</Text>
      </View>
    )
  }else {
    return (
    <View>
      <View style={Styles.tabMenu}>
        <View style={Styles.panel}></View>
        <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
        <Button text="carrito" onPress={() => {router.push('/Carrito')}}/>
        <Button text="Exit" onPress={() => {Alert.alert('Atención!', '¿Estas seguro de que quieres salir?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK', onPress: () => {router.push('/'); signOut(auth);}},
                ]);}}/>
      </View>
      <View style={Styles.View}>
        <FlatList style={Styles.FlatList} data={articules} renderItem={({item}) =>(<ArticuloCard articulo={item}></ArticuloCard>)} numColumns={2}></FlatList>
      </View>
    </View>
)
  }
  };
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
      alignSelf: 'center',
      paddingBottom: 160
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
