import { Pressable, StyleSheet, Text } from "react-native";

type loginButtonProperties = {
    text: string,
    onPress: () => void
}

const logButton: React.FC<loginButtonProperties> = ({
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
        width: 120,
        padding: 10,
        margin: 5,
        backgroundColor:'rgb(215, 215, 215)',
        borderStyle: 'solid',
        borderColor: 'rgb(75, 75, 75)',
        borderWidth: 2,
        fontWeight: 'bold',
        fontFamily: 'cursive',
        fontSize: 20,
        textAlign: 'center'
    }
})



export default logButton;