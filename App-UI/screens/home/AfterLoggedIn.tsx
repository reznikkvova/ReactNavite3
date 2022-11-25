import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, ImageBackground, StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';
import UserContext from '../../hooks/context/UserContext';
import { styles } from '../../styles';
import ViewMemoScreen from '../memo/ViewMemo';

export default function HomeScreen() {
  const nav = useNavigation();
  const { role, user, authenticated } = React.useContext(UserContext);

  const viewDirectory = () => {
    nav.navigate('DirectoryScreen');
  }

  const viewAddMemo = () => {
    nav.navigate('AddMemoScreen');
  }

  const viewTickets = () => {
    nav.navigate('ViewTicketScreen');
  }
  return (
      <View style={styles1.container}>
        <View style={styles.break}></View>
        <Text style={styles.title}>Welcome, {user}</Text>
        <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.row}>
          <Button onPress={viewDirectory} title="Directory" />
          <View style={styles.break}></View>
          <Button onPress={viewTickets} title=" Tickets " />
          <View style={styles.break}></View>
          <Button onPress={viewAddMemo} title="New Memo" />
        </View>
        <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <ViewMemoScreen/>
      </View>
  );
}

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
