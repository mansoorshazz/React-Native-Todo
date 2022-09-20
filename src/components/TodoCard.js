import { View, StyleSheet, Dimensions, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import ItemSeperator from "./ItemSeperatio";
import NoImage from "../constants/no_image";

const { height, width } = Dimensions.get("screen")

const setWidth = (w) => (width / 100) * w;
const setHeight = (h) => (height / 100) * h;


const TodoCard = ({ name, image, onPress }) => {


    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>

                <View style={styles.row}>

                    <ItemSeperator width={20} />

                    <Image
                        source={{
                            uri: image ?? NoImage,
                        }}
                        style={styles.cricleAvatar}
                    />

                    <ItemSeperator width={20} />

                    <Text style={styles.text} >{name}</Text>

                </View>


            </View>
        </TouchableOpacity>
    );

}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgrey',
        height: 70,
        width: setWidth(93),
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
    },
    cricleAvatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    text: {
        fontSize: 18,
        color: 'black',
        fontWeight: '400'
    }
},)





export default TodoCard;