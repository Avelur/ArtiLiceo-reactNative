import { Pressable, StyleSheet, Text } from "react-native";

type ButtonProperties = {
    text: string,
    onPress: () => void
}

const Button: React.FC<ButtonProperties> = ({
    text,
    onPress
}) => {
    return (
    <Pressable onPress={onPress} style={Styles.button}>
        <Text>{text}</Text>
        </Pressable>
    )
}

const Styles = StyleSheet.create({
    button:{
        flex: 1,
        padding: 10,
        backgroundColor:'rgb(215, 215, 215)',
        fontWeight: 'bold',
        fontFamily: 'cursive',
        fontSize: 20,
        alignItems: 'center'
    }
})



export default Button;