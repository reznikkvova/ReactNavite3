import React, { useState, Component, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList, ImageBackground } from 'react-native';
import { View } from '../../components/Themed';
import { styles } from '../../styles';

const DATA = [
    {
        Name: 'Daniel Kim',
        PhoneNumber: '101-123-7898',
        Email: 'daniel.kim@mail.com',
        Role: 'Technician',
    },
    {
        Name: 'John Doe',
        PhoneNumber: '101-823-2338',
        Email: 'john@mail.com',
        Role: 'Technician',
    },
    {
        Name: 'Lisa Lee',
        PhoneNumber: '777-222-2368',
        Email: 'Lisa@mail.com',
        Role: 'Technician',
    },
    {
        Name: 'Karen Hall',
        PhoneNumber: '911-333-3333',
        Email: 'Karen@mail.com',
        Role: 'Technician',
    },
    {
        Name: 'Ben Smith',
        PhoneNumber: '102-523-233',
        Email: 'ben@mail.com',
        Role: 'Admin',
    },
];

export default function DirectoryScreen() {

    const [onLoadText, setText] = useState("");

    const onScreenLoad = () => {
        setText("List of employees");
        // TODO: fetch logs axios call
    }
    useEffect(() => {
        onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:any}) => (
        <>
            <Item log={item} />
        </>
      );
    const Item = ({log}:{log:any}) => (
        <View style={styles2.item}>
            <Text style={styles2.txt}>[Name]:   {log.Name}</Text>
            <Text style={styles2.txt}>[Email]:   {log.Email}</Text>
            <Text style={styles2.txt}>[Phone]:   {log.PhoneNumber}</Text>
            <Text style={styles2.txt}>[Role]:   {log.Role}</Text>
        </View>
    );

    return (
        <ImageBackground source={require('../../assets/images/pic5.jpg')} style={styles2.image}>
            <View style={styles2.container}>
                <View style={styles.break}></View>
                <View style={styles.break}></View>
                <Text style={styles.title}>
                Directory
                </Text>
                <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.Name}
                    />
                </SafeAreaView>
                <View style={styles.break}/>
            </View>
        </ImageBackground>
    );
}

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    item: {
      backgroundColor: 'white',
      padding: 5,
      marginVertical: 5,
      marginHorizontal: 5,
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    txt: {
        fontSize: 15,
        textAlign: 'left',
        marginLeft: 5,
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
  });