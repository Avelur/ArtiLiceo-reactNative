import Button from "@/components/button";
import { router } from "expo-router";
import { StyleSheet, View, Text, StatusBar, ScrollView } from "react-native";

const ArticuloPage = ( articulo: Articulo ) => {
  return(
    <ScrollView>
      <View style={Styles.tabMenu}>
        <View style={Styles.panel}></View>
        <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
        <Button text="carrito" onPress={() => {router.push('/(tabs)Carrito')}}/>
        <Button text="Exit" onPress={()=>{}}/>
      </View>
      <View style={Styles.View}>
        <Text>{articulo.nombre}</Text>
      </View>
    </ScrollView>
  )
}
export default ArticuloPage;

const Styles = StyleSheet.create({
  tabMenu:{
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight || 0
  },
  View:{
    margin:20,
    alignContent: 'center'
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
