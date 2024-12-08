import Button from '@/components/button';
import { router, useLocalSearchParams } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

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

    return(
        <View>
            <View style={Styles.tabMenu}>
                <View style={Styles.panel}></View>
                    <Button text="Nuestros articules" onPress={() => {router.push('/MainPage')}}/>
                    <Button text="carrito" onPress={() => {}}/>
                    <Button text="Exit" onPress={()=>{}}/>
                </View>
            <Text>{articulo.id}</Text>
            <Text>{articulo.nombre}</Text>
            <Text>{articulo.descripcion}</Text>
            <Text>{articulo.precio}</Text>
            <Text>{articulo.imagePath}</Text>
            <Text>{articulo.tags+''}</Text>
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
      }
})
export default ArticuloPage;