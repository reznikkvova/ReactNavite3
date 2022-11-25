import React, { useState, useContext } from 'react';
import { styles } from '../styles';
import EditAssetScreen from '../screens/asset/EditAssetScreen';
import AddLogScreen from '../screens/log/AddLogScreen';
import { Text, View } from '../components/Themed';
import ViewLogScreen from '../screens/log/ViewLogScreen';
import { ScrollView } from 'react-native';

const EditDetailPage: React.FC<unknown> = () => {

  return (
    <>
    <ScrollView>
      <EditAssetScreen/>
      <View style={styles.break} />
      <View style={styles.separator}/>
      <View style={styles.break} />
      <AddLogScreen/>
    </ScrollView>
    </>
  );
}

export default EditDetailPage;