import React, { useContext } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Platform } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import UserContext from '../../hooks/context/UserContext';
import Asset from '../../models/asset';
import { addAsset, deleteStuff, getAsset } from '../../remote/backend.api';
import uuid from 'react-native-uuid';

const EditAssetScreen: React.FC<unknown> = (props) => {

  const { asset, setAsset, setAssets } = useContext(UserContext);
  const [make, setMake] = useState<string>(asset.make);
  const [model, setModel] = useState<string>(asset.model);
  const [facultyStaff, setFacultyStaff] = useState<string>(asset.assignee);
  const [department, setDepartment] = useState<string>(asset.department);
  const [room, setRoom] = useState<string>(asset.roomNumber);
  const [dateDecomissioned, setDateDecomissioned] = useState(new Date(1598051730000));
  const [OSType, setOSType] = useState<string>(asset.typeOS);
  const [AssetTag, setAssetTag] = useState<string>(asset.asset_tag);
  const [assetName, setAssetName] = useState<string>(asset.assetName);
  const [groupName, setGroupName] = useState<string>(asset.deviceGroup);
  const nav = useNavigation();
  const [dateRecieved, setDateRecieved] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleEdit = async () => {

    const res = await deleteStuff('/dasset', asset.id);
    const nAsset = new Asset(
      'asset',
      String(uuid.v4()),
      assetName,
      AssetTag,
      groupName,
      model,
      facultyStaff,
      String(dateRecieved),
      String(dateDecomissioned),
      department,
      OSType,
      room,
      make
    );
    const res2 = await addAsset(nAsset);
    setAsset(nAsset);
    const res3 = await getAsset();
    setAssets(res3);
    Alert.alert('Update Success!');
  };

  const handleDateRecived = (event:any, selectedDate:Date) => {
    const currentDate = selectedDate || dateRecieved;
    setShow(Platform.OS === 'ios');
    setDateRecieved(currentDate);
  };

  const handleDateDecomissioned = (event:any, selectedDate:Date) => {
    const currentDate = selectedDate || dateDecomissioned;
    setShow(Platform.OS === 'ios');
    setDateDecomissioned(currentDate);
  };

  const showMode = () => {
    setShow(true);
  };

  const showMode1 = () => {
    setShow1(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
          Edit Asset
      </Text>
      <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <View style={{ width: '100%', padding: 30, }}>
          <TextInput
            style={styles.textInput1}
            placeholder={asset.deviceGroup}
            onChangeText={text => setGroupName(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.asset_tag}
            onChangeText={text => setAssetTag(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.typeOS}
            onChangeText={text => setOSType(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.model}
            onChangeText={text => setModel(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.assignee}
            onChangeText={text => setFacultyStaff(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.department}
            onChangeText={text => setDepartment(text)}
          />
          <TextInput
            style={styles.textInput1}
            placeholder={asset.roomNumber}
            onChangeText={text => setRoom(text)}
          />
          <View style={styles.break} />
          <Button
            onPress={() => handleEdit()}
            title="Edit"
            color="blue"
          />
        </View>
    </View>
  );
}

export default EditAssetScreen;