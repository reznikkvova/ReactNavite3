import React, { useState, useContext } from 'react';
import { styles } from '../styles';
import AddAssetScreen from '../screens/asset/AddAsset';
import AddLogScreen from '../screens/log/AddLogScreen';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native';

const AddAssetPage: React.FC<unknown> = () => {

  return (
    <>
    <ScrollView>
        <AddAssetScreen/>
        <View style={styles.break} />
        <View style={styles.separator}/>
        <View style={styles.break} />
        <AddLogScreen/>
    </ScrollView>
    </>
  );
}

export default AddAssetPage;