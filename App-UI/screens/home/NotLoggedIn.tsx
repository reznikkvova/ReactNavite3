import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Button, StyleSheet, ImageBackground } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function NHomeScreen() {
  const nav = useNavigation();
  const viewDirectory = () => {
    nav.navigate('DirectoryScreen');
  }
  return (
    <ImageBackground source={require('../../assets/images/pic5.jpg')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>iManage</Text>
        <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <Button onPress={viewDirectory} title="Directory" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
