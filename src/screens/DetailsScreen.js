import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import AppBar from "../components/AppBar";
import NoImage from "../constants/no_image";




const DetailsScreen = ({ route, navigation, }) => {

    const { name, age, image, index } = route.params;

    const [students, getStudents] = useState([])



    const findStudents = async () => {
        const result = await AsyncStorage.getItem("students")
        if (result !== null) getStudents(JSON.parse(result));

    }

    const deleteStudent = async () => {
        students.splice(index, 1);

        await AsyncStorage.setItem('students', JSON.stringify(students))

    }


    useEffect(() => {
        findStudents()
        // console.log(students);
        // console.log(index);
    })





    return (
        <View style={styles.container} >

            <StatusBar style="auto" />

            <AppBar title={"Details Screen"} visible={true} navigation={navigation} deleteFunction={() => deleteStudent()} studentDetails={students[index]} index={index} />


            <Image
                source={{
                    uri: image ?? NoImage,
                }}
                resizeMode={"contain"}
                style={styles.circleAvatar}
            />



            <Text style={styles.text} >Name: {name}</Text>
            <Text style={styles.text} >Age: {age}</Text>

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    circleAvatar: {
        height: 150,
        width: 150,
        borderRadius: 100,
        marginVertical: 30,
    },
    text: {
        fontSize: 25,
        paddingVertical: 10,
        fontWeight: 'bold',
    }
})


export default DetailsScreen;