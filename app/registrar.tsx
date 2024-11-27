import { router } from "expo-router";
import { StyleSheet, TextInput, View } from "react-native";
import LogButton from "@/components/button";
import '../firebaseConfig'
import { useFonts } from 'expo-font'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import React from "react";

export default function index() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loaded, error] = useFonts({
    'cursive': require('../assets/fonts/font.otf')
  })
  const auth = getAuth();
  return (
    <View
      style={Styles.view}>
      <TextInput style={Styles.TextInput} placeholder="new email" onChangeText={onChangeEmail}/>
      <TextInput style={Styles.TextInput} placeholder="new password" onChangeText={onChangePassword} secureTextEntry={true}/>
      <TextInput style={Styles.TextInput} placeholder="repite password" onChangeText={setConfirmPassword} secureTextEntry={true}/>
      <LogButton text="Registrarse" onPress={() => {
        console.log(password);
        if(password == confirmPassword){
          createUserWithEmailAndPassword(auth, email, password).then((userCred) => 
        {const user = userCred.user; router.push('/MainPage')}).catch((error) => {console.log(error)})
        }else{
          console.log("Las contraseñas no coinciden.")
        }
        }}/>
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
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: 'cursive'
  }
})