import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert, TextInput } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import ItemSeperator from "./ItemSeperatio";
import { useState } from "react";


const { height, width } = Dimensions.get("screen")

const AppBar = ({ title, visible, searchIcon, navigation, deleteFunction, studentDetails, index }) => {

    const [search, searchItem] = useState("");


    const alertFunction = () => {
        Alert.alert(
            "Delete",
            "Are you sure ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        deleteFunction();
                        navigation.replace("home");
                    }
                }
            ]
        );
    }

    return (
        <View style={styles.appbar}>
            <Text style={styles.appbarText} >{title}</Text>


            {searchIcon ? <TouchableOpacity onPress={() => {
                searchItem("value");
                console.log(search);
            }} >

                <AntDesign style={styles.icon} name="search1" size={24} color="black" />

            </TouchableOpacity> : null
            }

            {
                visible ? <View style={styles.buttonRow}>
                    <TouchableOpacity onPress={() => {
                        navigation.push("addstudent", { "isEditing": true, studentDetails, index })
                    }}>

                        <AntDesign style={styles.icon} name="edit" size={24} color="black" />

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        alertFunction()
                    }}>

                        <AntDesign style={styles.icon} name="delete" size={24} color="black" />

                    </TouchableOpacity>
                </View>
                    : null
            }
        </View >
    )
}

AppBar.defaultProps = {
    visible: false,
    searchIcon: false,
}



const styles = StyleSheet.create({
    appbar: {
        height: 80,
        width: width,
        backgroundColor: "white",
        elevation: 100,
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    appbarText: {
        marginTop: 40,
        marginLeft: 10,
        alignItems: "center",
        fontSize: 20,
        fontWeight: '500',
        color: "black",
    },
    icon: {
        marginTop: 40,
        marginRight: 20,
        alignSelf: 'center',
    },
    buttonRow: {
        flexDirection: 'row',
    }
})


export default AppBar;