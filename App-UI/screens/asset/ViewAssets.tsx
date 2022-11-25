import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Button, FlatList, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../hooks/context/UserContext';
import Asset from '../../models/asset';
import { styles } from '../../styles';
import { getAsset } from '../../remote/backend.api';
import { SearchBar } from 'react-native-elements';
import Searchbar from '../../components/searchbar/Searchbar';
export const ViewAssetScreen: React.FC<unknown> = () => {

    const { setAsset, setAssets, assets } = useContext(UserContext);
    const [filter, setFilter] = useState('');
    const nav = useNavigation();
    const [arr, setArr] = useState<Asset[] | null>(assets);

    const [filtered, setFiltered] = useState<Asset[]|null>(null);

    const viewDetail = (asset1:Asset) => {
      setAsset(asset1);
      console.log(asset1);
      nav.navigate('ViewDetail');
    }

    const onScreenLoad = async () => {
      const res = await getAsset();
      setAssets(res);
      setArr(res);
      console.log(res);
    }

    const filterSearch = async () => {
      let arrr = [];
      if('all' == filter) {
        // const res = await getAsset();
        setArr(assets);
        return;
      }
      if(assets){
        for(let i=0; i<assets.length; i++) {

          if(assets[i].asset_tag === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].make === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].model === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].assetName === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].deviceGroup === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].assignee === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].typeOS === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].roomNumber === filter) {
            arrr.push(assets[i]);
          }
          if(assets[i].department === filter) {
            arrr.push(assets[i]);
          }
        }
        setArr(arrr);
      }
    }

    useEffect(() => {
      onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:any}) => (
      <>
        <Item asset={item} />
      </>
    );
    const Item = ({asset}:{asset:Asset}) => (
        <View style={styles2.asset}>
            <Text style={styles2.title}>{asset.asset_tag}</Text>
            <Text style={styles2.txt}>[Device Group]:   {asset.deviceGroup}</Text>
            <Text style={styles2.txt}>[Model]:   {asset.model}</Text>
            <Text style={styles2.txt}>[Assignee]:   {asset.assignee}</Text>
            <Button onPress={()=>viewDetail(asset)} title="View Detail" />
        </View>
    )

        return (
          <SafeAreaView style={styles.container}>
            <View style={styles.break} />
            <View style={styles.row}>
            <View style={styles.break} />
              <TextInput
                style={styles.textInput2}
                placeholder="Search Function"
                onChangeText={text => setFilter(text)}
              />
              <Button
                onPress={()=>filterSearch()}
                title="Submit"
                color="blue"
              />
            </View>
            <View style={styles.break} />
            <FlatList
              data={arr}
              initialNumToRender={4}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              // style={styles.container}
            />
          </SafeAreaView>
        );
    
        }
      
export  const styles2 = StyleSheet.create({
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
    asset:{
      backgroundColor: 'white',
      padding: 6,
      marginVertical: 5,
      marginHorizontal: 5,
      width:400,
      
    }
  });