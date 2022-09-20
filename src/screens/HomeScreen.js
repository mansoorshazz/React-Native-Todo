import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, FlatList, Alert, TextInput, TouchableOpacity } from 'react-native';
import ItemSeperator from '../components/ItemSeperatio';
import TodoCard from '../components/TodoCard';
import React, { useState, useEffect } from 'react';
import FAB from '../components/FloatingButton';
import AppBar from '../components/AppBar';
import * as SQLite from 'expo-sqlite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';



const { height, width } = Dimensions.get("screen")

const setWidth = (w) => (width / 100) * w;



const HomeScreen = ({ navigation }) => {

    const [students, getStudents] = useState([])
    const [searchText, onChangeSearch] = useState("")
    const [isSearching, setToSearching] = useState(false)

    // console.log(names)

    const findStudents = async () => {
        const result = await AsyncStorage.getItem("students")
        if (result !== null) getStudents(JSON.parse(result));
    }


    useEffect(() => {
        findStudents()
        console.log("use effect called");
    }, [])


    const filteredData = searchText ? students.filter(x => x.name.toLowerCase().includes(searchText.toLowerCase()))
        : students;





    return (
        <View style={styles.container}>
            <StatusBar style="auto" />


            <View style={styles.appbar}>

                {isSearching ? <TextInput
                    style={styles.appbarText}
                    onChangeText={onChangeSearch}
                    value={searchText}
                    placeholder="Enter a Name"
                /> : <Text style={styles.appbarText} >Todo App</Text>}

                <TouchableOpacity onPress={() => {
                    // searchItem("value");
                    setToSearching(!isSearching)

                    if (isSearching) {
                        onChangeSearch("");
                    }
                    // console.log(search);
                }} >

                    {isSearching ? <AntDesign style={styles.icon} name="close" size={24} color="black" />
                        : <AntDesign style={styles.icon} name="search1" size={24} color="black" />
                    }
                </TouchableOpacity>

            </View >






            {filteredData.length === 0 ? <Text style={{ alignSelf: "center", paddingTop: 20 }} >Data not found</Text> : <View style={styles.todoListContainer}>

                <FlatList
                    data={filteredData}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => <ItemSeperator height={15} />}
                    ListFooterComponent={() => <ItemSeperator height={15} />}
                    ItemSeparatorComponent={() => <ItemSeperator height={15} />}
                    renderItem={({ item, index }) => <TodoCard name={item.name} onPress={() => navigation.push("detailsscreen", { "name": item.name, "age": item.age, "image": item.image, "index": index })} image={item.image} />}
                />

            </View>}

            <FAB onPress={() => {

                navigation.push("addstudent", { "isEditing": false });

            }} />


        </View>
    );
}



const styles = StyleSheet.create(
    {
        appbar: {
            height: 80,
            width: width,
            backgroundColor: "white",
            elevation: 100,
            alignItems: "flex-start",
            justifyContent: "space-between",
            flexDirection: "row",
        },
        container: {
            flex: 1, appbarText: {
                marginTop: 40,
                marginLeft: 10,
                alignItems: "center",
                fontSize: 20,
                fontWeight: '500',
                color: "black",
            },
            backgroundColor: '#fff',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        todoListContainer: {
            paddingHorizontal: 10,
        },
        floatButton: {
            height: 30,
            backgroundColor: 'red',
            width: 30,
            borderRadius: 20,
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
    });




export default HomeScreen;