import ArticuloPage from "@/app/(tabs)/Articulo";
import { router, useLocalSearchParams } from "expo-router";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, Text, View, FlatList, } from "react-native";

type articuloProps = {
    articulo: Articulo
}

const ArticuloCard: React.FC<articuloProps> = ({ articulo }) => {
    
    const tags:any = [];
    const storage = getStorage();
    const gsReference = ref(storage, 'images/' + articulo.imagePath);
    const [path, setPath] = useState('');
    const image = () => {
        getDownloadURL(gsReference)
        .then((url) => {
            //console.log('path: ' + url);
            setPath(url);
        }).catch((error) => {
            console.log("URL error")
        });
      }
      image();
    return(
        <Pressable style={Styles.View} onPress={() => {router.push(`/${articulo}`)}}>
            <View>
                <View style={Styles.cabeza}>
                    <Text style={Styles.text}>{articulo.nombre}</Text>
                </View>
                <View style={Styles.contenido}>
                    {path &&
                    <Image style={Styles.Image} source={{uri:path}}></Image>}
                    <Text style={Styles.precio}>{articulo.precio}</Text>
                </View>
                <View style={Styles.fin}>
                    <Pressable style={Styles.carrito} onPress={()=>{}}><Text>Añadir al carrito</Text></Pressable>
                    <FlatList data={tags} renderItem={({item}) => (<Text style={{margin: 5}}>{item.tag}</Text>)} numColumns={3}></FlatList>
                </View>
            </View>
        </Pressable>
    )
}

export default ArticuloCard;

const Styles = StyleSheet.create({
    View:{
        width: 160,
        height: 300,
        alignItems: 'center',
        backgroundColor: 'rgb(255, 245, 224)',
        padding: 20,
        borderRadius: 15,
        margin: 10,
        justifyContent: 'flex-start'
    },
    cabeza: {
        alignSelf: 'flex-start',
        height: 50
    },
    contenido: {
        height: 175, 
        alignSelf: 'center'
    },
    fin: {
        alignSelf: 'center'
    },
    text: {
        fontSize: 13,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center'
    },
    precio: {
        fontSize: 14,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        alignSelf: 'center'
    },
    Image: {
        width: 144,
        height: 96,
        alignContent: 'center',
        borderColor: 'gray',
        backgroundColor: 'white'
    },
    carrito: {
        padding: 10,
        backgroundColor: 'rgb(166, 150, 134)',
        color: 'white',
        borderRadius: 5
    }
})