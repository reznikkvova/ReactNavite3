import React, { useState, Component, useEffect } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { styles } from '../../styles';
import Memo from '../../models/memo'
import { getMemo } from '../../remote/backend.api';
import { useContext } from 'react';
import UserContext from '../../hooks/context/UserContext';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ViewMemoScreen() {

    const { memos, setMemos, memo, setMemo } = useContext(UserContext);
    const nav = useNavigation();

    const onScreenLoad = async () => {
        const rest = await getMemo();
        setMemos(rest);
        console.log(rest);
    }

    const viewDetail = (me:Memo) => {
        setMemo(me);
        nav.navigate('ViewMemo');
    }

    useEffect(() => {
        onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:Memo}) => (
        <>
            <Item log={item} />
        </>
      );
    const Item = ({log}:{log:Memo}) => (
        <View style={styles2.item}>
            <Text style={styles2.title}>{log.date}</Text>
            <Text style={styles2.txt}>[User]:   {log.user}</Text>
            <Text style={styles2.txt}>[Message]:   {log.message}</Text>
            <Button onPress={()=>viewDetail(log)} title="View" />
        </View>
    );

    return (
        <View style={styles.container}>
        <View style={styles.break}></View>
        <View style={styles.break}></View>
        <Text style={styles.title}>
            Threads
        </Text>
        <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <SafeAreaView style={styles.container}>
            <FlatList
                data={memos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
        <View style={styles.break}/>
        </View>
    );
}

const styles2 = StyleSheet.create({
    container: {
      flex: 1,
    },
    item: {
      backgroundColor: '#D3D3D3',
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
  });