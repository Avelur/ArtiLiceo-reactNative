import { StyleSheet, TextInput, View } from "react-native";

const searchBadge = () => {
    return(
        <View style={Styles.view}>
            <TextInput style={Styles.searchbar} placeholder="Type text for search..."></TextInput>
        </View>
    )
}

const Styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    searchbar: {
        width: 350,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        borderStyle: 'solid',
        borderColor: 'gray',
        borderWidth: 2
    }
});

export default searchBadge;