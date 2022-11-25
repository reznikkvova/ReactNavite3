import React, { useState, useContext } from 'react';
import UserContext from '../../hooks/context/UserContext';
import { Alert, Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../../styles';
import Tickets from '../../models/tickets';
import uuid from 'react-native-uuid';
import { addTicket, getTicket } from '../../remote/backend.api';

const AddTicketScreen: React.FC<unknown> = () => {

  const [assetTag, setAssetTag] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [issue, setIssue] = useState<string>('');
  const { user, setTickets } = useContext(UserContext);
  const nav = useNavigation();

  const handleAddTicket = async () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const t = new Tickets('ticket', String(uuid.v4()), today.toLocaleDateString(), assetTag, issue, room, user, 'waiting');
    const res = await addTicket(t);
    const res2 = await getTicket();
    setTickets(res2);
    Alert.alert("Thanks for the submission!")
    nav.navigate('Home');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Ticket</Text>
      <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
      <View style={{ width: '100%', padding: 25, }}>
          <TextInput
          style={styles.textInput1}
          placeholder="Asset Tag"
          onChangeText={text => setAssetTag(text)}
          />
          <TextInput
          style={styles.textInput1}
          placeholder="Issue"
          onChangeText={text => setIssue(text)}
          />
          <TextInput
          style={styles.textInput1}
          placeholder="Room Number"
          onChangeText={text => setRoom(text)}
          />
          <View style={styles.break} />
          <Button
          onPress={handleAddTicket}
          title="Submit"
          color="blue"
          />
      </View>
    </View >
  );
}

export default AddTicketScreen;