import { router } from "expo-router";
import { StyleSheet, TextInput, View, Text, Alert } from "react-native";
import LogButton from "@/components/loginButton";
import '../firebaseConfig'
import { useFonts } from 'expo-font'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import React from "react";

export default function index() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ year, setYear ] = useState<any>();
  const [ month, setMonth ] = useState<any>();
  const [ day, setDay ] = useState<any>();
  let [fontsLoaded] = useFonts({
    'font': require('../assets/fonts/font.otf')
  });
  let mayorDeEdad: boolean = false;
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const auth = getAuth();
  return (
    <View style={Styles.view}>
      <TextInput style={Styles.TextInput} placeholder="nombre de usuario" onChangeText={onChangeEmail}/>
      <TextInput style={Styles.TextInput} placeholder="correo electronico" onChangeText={onChangeEmail}/>
      <TextInput style={Styles.TextInput} placeholder="contraseña" onChangeText={onChangePassword} secureTextEntry={true}/>
      <TextInput style={Styles.TextInput} placeholder="repite contraseña" onChangeText={setConfirmPassword} secureTextEntry={true}/>
      <View style={Styles.dateView}>
        <TextInput style={Styles.DateInput} placeholder="año" onChangeText={setYear}/>
        <TextInput style={Styles.DateInput} placeholder="mes" onChangeText={setMonth}/>
        <TextInput style={Styles.DateInput} placeholder="día" onChangeText={setDay}/>
      </View>
      <LogButton text="Registrarse" onPress={() => {
        console.log(password);
        const data = new Date();
        if(password == confirmPassword){

          if(data.getFullYear() - year > 18){
            mayorDeEdad = true;
          }else{
            if(data.getFullYear() - year == 18 && data.getMonth() - month > -1){
              mayorDeEdad = true;
            }else{
              if(data.getFullYear() - year == 18 && data.getMonth() - month == -1 && data.getDate() - day >= 0){
                mayorDeEdad = true;
              }else{
                Alert.alert('Error!', 'tienes que ser mayor de edad!', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                  {text: 'OK'},
                ]);
              }
            }
          }
          if(mayorDeEdad){
            console.log(data.getFullYear() - year);
            console.log(data.getMonth() - month);
            console.log(data.getDate() - day);
            createUserWithEmailAndPassword(auth, email, password).then((userCred) => 
            {const user = userCred.user; router.push('/MainPage')}).catch((error) => {console.log(error)})
          }
        }else{
          Alert.alert('Error!', 'Los contraseñas tienen que coincidir!', [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {text: 'OK'},
          ]);
        }
      }
    }/>
      <LogButton text="Volver" onPress={() => router.push('/')}/>
    </View>
  );
}

const Styles = StyleSheet.create({
  TextInput: {
    width: 250,
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'rgb(75, 75, 75)',
    fontSize: 20
  },
  DateInput: {
    width: 100,
    margin: 10,
    padding: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'rgb(75, 75, 75)',
    fontSize: 20
  },
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'font'
  },
  dateView: {
    flexDirection: 'row'
  }
})