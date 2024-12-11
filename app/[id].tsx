import Button from '@/components/button';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, Pressable } from 'react-native';

const ArticuloPage = () => {
    const { id } = useLocalSearchParams();
    const db = getFirestore();
    const [ articulo, setArticulo] = useState<any>([]);
    const docId: string = id.toString();
    useEffect(() => {
        const fetchDatos = async () => {
            getDoc(doc(db, "articules", docId)).then((data) => {
                setArticulo(data.data());
                console.log(1);
            })
        }
        fetchDatos();
    }, [setArticulo])

    const [path, setPath] = useState('');
    const storage = getStorage();
    const gsReference = ref(storage, 'images/' + articulo.imagePath);

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

      let precioString = articulo.precio + "€";
    return(
        <View style={Styles.view}>
            <View style={Styles.tabMenu}>
                <View style={Styles.panel}></View>
                    <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
                    <Button text="carrito" onPress={() => {}}/>
                    <Button text="Exit" onPress={()=>{}}/>
            </View>
            {path ? <Image style={Styles.image} source={{uri:path}}></Image> : null}
            <Text>{articulo.id}</Text>
            <Text style={Styles.textNombre}>{articulo.nombre}</Text>
            <Text>{articulo.description}</Text>
            <Text style={Styles.textNombre}>{precioString}</Text>
            <Text>{articulo.tags+''}</Text>
            <Pressable style={Styles.carrito} onPress={()=>{}}><Text style={Styles.anadir}>Añadir al carrito</Text></Pressable>
        </View>
        
    )
}

const Styles = StyleSheet.create({
    panel:{
        flex: 2,
        padding: 10,
        backgroundColor:'white'
      },
      tabMenu:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight || 0,
        color: 'white'
      }, 
      view: {
        flex: 1,
        alignItems: 'center'
      },
      image: {
        width: '70%',
        height: '20%',
        alignContent: 'center',
        borderColor: 'gray',
        backgroundColor: 'white',
        margin: 15
      },
      textNombre: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
      },
      carrito: {
        padding: 10,
        backgroundColor: 'rgb(205, 191, 164)',
        color: 'white',
      },
      anadir: {
        fontSize: 20,
        fontWeight: 'bold'
      }
})
export default ArticuloPage;