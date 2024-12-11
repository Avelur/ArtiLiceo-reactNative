import { router } from "expo-router";
import { StyleSheet, TextInput, View, Text } from "react-native";
import '../firebaseConfig'
import { useFonts } from 'expo-font'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import LogButton from "@/components/loginButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export
let authEmail: string;

export default function index() {
  const [email, onChangeEmail] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  let [fontsLoaded] = useFonts({
    'font': require('../assets/fonts/font.otf')
  });
  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }
  const auth = getAuth();
  return (
    <View style={Styles.view}>
      <TextInput style={Styles.TextInput} placeholder="email" onChangeText={onChangeEmail}/>
      <TextInput style={Styles.TextInput} placeholder="password" onChangeText={onChangePassword} secureTextEntry={true}/>
      <LogButton text="Entrar" onPress={() => {signInWithEmailAndPassword(auth, email, password).then(async (userCred) => 
        {
          const user = userCred.user; router.push(`/MainPage`);
          await AsyncStorage.setItem("userEmail", email);
          }).catch((error) => {
          console.log(error)
          })
        }}/>
      <LogButton text="Registrarme" onPress={() => router.push('/registrar')}/>
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
    fontFamily: 'font'
  },
  font: {
    fontFamily: 'font'
  }
})