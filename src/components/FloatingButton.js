import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { Entypo } from '@expo/vector-icons';



const FAB = (props) => {
    return (
        <Pressable style={styles.container}
            onPress={props.onPress}>
            <Entypo name="plus" size={24} color="white" />
        </Pressable>
    );
};



const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
        position: "absolute",
        bottom: 30,
        right: 30,
        backgroundColor: "black",
        height: 60,
        width: 60,
        elevation: 10,
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
});

export default FAB;