import { borrarDelCarrito } from "@/app/Carrito";
import { router } from "expo-router";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { StyleSheet, Image, Pressable, Text, View, FlatList, } from "react-native";

type articuloProps = {
    articuloId: string,
    cantidad: number
}

const CarritoCard: React.FC<articuloProps> = ({ articuloId, cantidad }) => {
    const tags:any = [];
    const db = getFirestore();
    //const gsReference = ref(storage, 'images/' + articulo.imagePath);
    const [path, setPath] = useState('');
    //const id: any = articulo.id;
    /*
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
      */

    const [ articulo, setArticulo] = useState<any>();

    useEffect(() => {
        const fetchDatos = async () => {
            getDoc(doc(db, "articules", articuloId)).then((data) => {
                setArticulo(data.data())
            })
        }
        fetchDatos();
    }, [setArticulo])
    

    function borrarCarrito(){
        borrarDelCarrito(articuloId);
    }

    return(
        <Pressable style={Styles.View}>
            <View>
                <View style={Styles.cabeza}>
                    <Text style={Styles.text}>1</Text>
                </View>
                <View style={Styles.contenido}>
                    <Text style={Styles.precio}>2</Text>
                </View>
                <View style={Styles.fin}>
                    <Pressable style={Styles.carrito} onPress={borrarCarrito}><Text>Borrar del carrito</Text></Pressable>
                    <FlatList data={tags} renderItem={({item}) => (<Text style={{margin: 5}}>{item.tag}</Text>)} numColumns={3}></FlatList>
                </View>
            </View>
        </Pressable>
    )
}

export default CarritoCard;

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
    },
    tag: {
        padding: 5,
        backgroundColor: 'rgb(166, 150, 134)',
        color: 'white',
        borderRadius: 5,
        width: 100,
        margin: 5
    }
})