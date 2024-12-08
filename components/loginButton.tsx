import { useFonts } from "expo-font";
import { Pressable, StyleSheet, Text } from "react-native";

type loginButtonProperties = {
    text: string,
    onPress: () => void
}

const logButton: React.FC<loginButtonProperties> = ({
    text,
    onPress
}) => {
    let [fontsLoaded] = useFonts({
        'font': require('../assets/fonts/font.otf')
      });
      if (!fontsLoaded) {
        return <Text>Loading fonts...</Text>;
      }
    return (
    <Pressable onPress={onPress} style={Styles.button}>
        <Text style={Styles.font}>{text}</Text>
    </Pressable>
    )
}

const Styles = StyleSheet.create({
    button:{
        width: 120,
        padding: 10,
        margin: 5,
        backgroundColor:'rgb(215, 215, 215)',
        borderStyle: 'solid',
        borderColor: 'rgb(75, 75, 75)',
        borderWidth: 2,
        fontSize: 20,
        textAlign: 'center'
    },
    font: {
        fontWeight: 'bold',
        fontFamily: 'font',
    }
})



export default logButton;