import React, { useCallback, useContext, useEffect } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput, Platform, ScrollView } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import uuid from 'react-native-uuid';
import Asset, { deviceGroup, typeOS } from '../../models/asset';
import { addAsset, getAsset } from '../../remote/backend.api';
import UserContext from '../../hooks/context/UserContext';
import {Picker} from '@react-native-community/picker';

const AddAssetScreen: React.FC<unknown> = (props) => {

  const [model, setModel] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [facultyStaff, setFacultyStaff] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [dateDecomissioned, setDateDecomissioned] = useState(new Date(1598051730000));
  const [OSType, setOSType] = useState<string>('iOS');
  const [AssetTag, setAssetTag] = useState<string>('');
  const [assetName, setAssetName] = useState<string>('');
  const [groupName, setGroupName] = useState<string>('Computing Device');
  const nav = useNavigation();
  const [dateRecieved, setDateRecieved] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const { setAssets } = useContext(UserContext);

  const handleSubmit = async () => {
    const as = new Asset('asset', String(uuid.v4()), assetName, AssetTag, groupName, model, facultyStaff, String(dateRecieved), String(dateDecomissioned), department, OSType, room, make);
    const res = await addAsset(as);
    const res2 = await getAsset();
    setAssets(res2);
    Alert.alert('asset submitted');
  }

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

  useEffect(() => {
    setShow1(false);
    setShow(false);
}, [])

  return (
    <View style={styles.container}>
        <>

          <View style={{ width: '100%', padding: 30, }}>
            <TextInput
              style={styles.textInput1}
              placeholder="Asset Name"
              onChangeText={text => setAssetName(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Asset Tag"
              onChangeText={text => setAssetTag(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Model"
              onChangeText={text => setModel(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Faculty Name"
              onChangeText={text => setFacultyStaff(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Department"
              onChangeText={text => setDepartment(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Room"
              onChangeText={text => setRoom(text)}
            />

            <Picker
            selectedValue={groupName}
            style={{ height: 30, width: '100%', margin:5 }}
            onValueChange={(itemValue) => setGroupName(itemValue as string)}
            >
              <Picker.Item label="Computing Device" value="Computing Device" />
              <Picker.Item label="IO Device" value="IO Device" />
            </Picker>

            <Picker
            selectedValue={make}
            style={{ height: 30, width:'100%', margin:5 }}
            onValueChange={(itemValue) => setMake(itemValue as string)}
            >
              <Picker.Item label="Acer" value="Acer" />
              <Picker.Item label="HP" value="HP" />
              <Picker.Item label="Dell" value="Dell" />
            </Picker>

            <Picker
            selectedValue={OSType}
            style={{ height: 30, width: '100%', margin:5 }}
            onValueChange={(itemValue) => setOSType(itemValue as string)}
            >
              <Picker.Item label="iOS" value="iOS" />
              <Picker.Item label="Linux" value="Linux" />
              <Picker.Item label="Windows 7" value="Windows 7" />
              <Picker.Item label="Windows 8" value="Windows 8" />
              <Picker.Item label="Windows 10" value="Windows 10" />
            </Picker>

            <View>
                <Button onPress={showMode} title="Date Recieved" />
            </View>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                value={dateRecieved}
                is24Hour={true}
                display="default"
                onChange={ () => handleDateRecived } 
                />
            )}

            <View style={styles.break} />
            <Button
              onPress={() => handleSubmit()}
              title="Submit"
              color="blue"
            />
          </View>
        </>
    </View >
  );
}

export default AddAssetScreen;