import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Dimensions, Button, Image, TouchableOpacity } from "react-native"
import AppBar from "../components/AppBar";
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NoImage from "../constants/no_image";


const { height, width } = Dimensions.get('screen')

// const setWidth (w) => 
const setWidth = (w) => (width / 100) * w;



const AddStudentScreen = ({ route, navigation }) => {

    const { isEditing, studentDetails, index } = route.params;

    const [name, onChangeName] = useState("")
    const [age, onChangeAge] = useState(null)
    const [image, setImage] = useState(null);
    const [students, getStudents] = useState([])


    // AsyncStorage.mergeItem()
    // This method is used to get all the user details

    const findStudents = async () => {
        const result = await AsyncStorage.getItem("students")
        if (result !== null) getStudents(JSON.parse(result));
    }



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        console.log(result);


        if (!result.cancelled) {
            setImage(result.uri);
        }
    };


    handleOnSubmit = async (name, age, image) => {
        const student = { id: Date.now(), name, age, image, time: Date.now() }
        const updatedStudents = [...students, student];


        await AsyncStorage.setItem('students', JSON.stringify(updatedStudents))

    }


    const editStudent = async () => {

        students[index].name = name;
        students[index].age = age;
        students[index].image = image;


        await AsyncStorage.setItem('students', JSON.stringify(students))

    }



    useEffect(() => {
        findStudents()
        if (isEditing) {
            onChangeName(studentDetails.name)
            onChangeAge(studentDetails.age)
            setImage(studentDetails.image)
        }
    }, [false])




    return (
        <View style={styles.container} >

            <AppBar title={"Add Student"} />

            <TouchableOpacity onPress={() => {
                pickImage()
            }}>
                <Image
                    source={{
                        uri: image ?? NoImage,
                    }}
                    resizeMode={"contain"}
                    style={styles.circleAvatar}
                />
            </TouchableOpacity>



            <TextInput
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Enter a Name"
            />

            <TextInput
                keyboardType="number-pad"
                style={styles.input}
                onChangeText={onChangeAge}
                value={age}
                placeholder="Enter a Age"
            />

            <View style={styles.buttonRow} >
                <Button
                    title="Cancel"
                    onPress={() => {

                        // AsyncStorage.clear()

                    }}
                />
                <Button

                    title={isEditing ? "Update" : "Save"}
                    onPress={async () => {

                        if (isEditing) {
                            console.log("Editing function is not called");
                            editStudent()
                        } else {
                            handleOnSubmit(name, age, image)
                        }


                        navigation.replace("home");

                    }}
                />
            </View>

        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    circleAvatar: {
        height: 130,
        width: 130,
        borderRadius: 100,
        marginVertical: 30,
    },
    input: {
        height: 50,
        borderRadius: 7,
        width: setWidth(93),
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "stretch",
        paddingHorizontal: 12,
        paddingVertical: 20,
    }
})


export default AddStudentScreen;


