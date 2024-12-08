import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown"

type filterType = {
    onChange?: void
}

const FilterBadge: React.FC<filterType> = ( onChange ) => {
    const nodes = [
        {label: "nombre", value: ""},
        {label: "precio", value: ""}
    ];
    const tags = [
        {label: "lianzos", value: ""},
        {label: "pinceles", value: ""},
        {label: "pintas", value: ""},
        {label: "accesories", value: ""},
        {label: "otros", value: ""}
    ]
    return(
        <View style={Styles.view}>
            <Dropdown style={Styles.filter} data={nodes} labelField="label" valueField="value" placeholder="nombre" onChange={() => {onChange}}></Dropdown>
            <Dropdown style={Styles.filter} data={tags} labelField="label" valueField="value" onChange={() => {onChange}}></Dropdown>
        </View>
    )
}

const Styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    filter: {
        width: 150,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        margin: 10
    }
});

export default FilterBadge;