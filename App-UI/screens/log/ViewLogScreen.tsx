import React, { useState, Component, useEffect, useContext } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { View } from '../../components/Themed';
import { styles } from '../../styles';
import Log from '../../models/log';
import { getLog } from '../../remote/backend.api';
import UserContext from '../../hooks/context/UserContext';

export default function ViewLogScreen() {

    const { asset, logs, setLogs } = useContext(UserContext);

    const onScreenLoad = async () => {
        const res = await getLog(asset.asset_tag);
        // fetch logs axios call
        setLogs(res);
    }
    useEffect(() => {
        onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:Log}) => (
        <>
            <Item log={item} />
        </>
      );
    const Item = ({log}:{log:Log}) => (
        <View style={styles2.item}>
            <Text style={styles2.title}>{log.date}</Text>
            <Text style={styles2.txt}>[Tech]:   {log.tech}</Text>
            <Text style={styles2.txt}>[Problem Type]:   {log.problemType}</Text>
            <Text style={styles2.txt}>[Description]:   {log.description}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
        <View style={styles.break}></View>
        <View style={styles.break}></View>
        <Text style={styles.title}>
            Repair Log
        </Text>
        <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <SafeAreaView style={styles.container}>
            <FlatList
                data={logs}
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