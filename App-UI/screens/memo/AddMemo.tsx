import React, { useState, useContext } from 'react';
import UserContext from '../../hooks/context/UserContext';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import uuid from 'react-native-uuid';
import Memo from '../../models/memo';
import { addMemo, getMemo } from '../../remote/backend.api';
import { Alert } from 'react-native';

const AddMemoScreen: React.FC<unknown> = () => {
  const [message, setMessage] = useState<string>('');
  const { user, setMemos } = useContext(UserContext);
  const nav = useNavigation();
  const handleSubmitMemo = async () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const m = new Memo('memo', String(uuid.v4()), today.toLocaleDateString(), user, message);
    const res = await addMemo(m);
    const rest = await getMemo();
    setMemos(rest);
    Alert.alert('Memo submitted');
  }

  return (
    <View style={styles.container}>    
        <Text style={styles.title}>
            Submit Memo
        </Text>
        <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <View style={{ width: '100%', padding: 25, }}>
            <TextInput
            style={styles.textInput1}
            placeholder="Message"
            onChangeText={text => setMessage(text)}
            />
            <Button
                title="Submit"
                color="blue"
                onPress={ () => handleSubmitMemo() }
            ></Button>
        </View>
    </View >
  );
}

export default AddMemoScreen;