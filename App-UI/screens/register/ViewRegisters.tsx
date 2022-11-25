import React, { useState, Component, useEffect, useContext } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList, Modal, Button, Alert, TimePickerAndroidTimeSetAction } from 'react-native';
import { View } from '../../components/Themed';
import UserContext from '../../hooks/context/UserContext';
import { styles } from '../../styles';
import Register from '../../models/register';
import { getRegister, update } from '../../remote/backend.api';

// const DATA3:Array<Register> = [
//     {
//         id: 'dksd',
//         name: 'Ben Smith',
//         role: 'Technician',
//         status: 'pending',
//         password: '123',
//     },
//     {
//         id: 'aaa',
//         name: 'Jason Lee',
//         role: 'User',
//         status: 'pending',
//         password: '123',
//     },
//     {
//         id: 'bbb',
//         name: 'Liza',
//         role: 'User',
//         status: 'pending',
//         password: '123',
//     },
// ];

export default function ViewMemoScreen() {

	  const [register, setRegister] = useState<Register | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { registers, setRegisters } = useContext(UserContext);
    const [DATA3, setDATA3] = useState<Register[] | null>(null);

    const approve = async () => {
			const log = register;
			if(register && DATA3) {
        const res = await update('/register', register.id, 'status', 'approved');
        console.log('update is: ', res);
				for (let i=0; i<DATA3.length; i++) {
					if(DATA3[i].id === register.id) {
						DATA3[i].status = 'approved';
						setRegisters(DATA3);
						break;
					}
				}
			}
			Alert.alert("Status updated to fixed!");
			setModalVisible(false);
    };

    const reject = async () => {
				if(register && DATA3) {
          const res = await update('/register', register.id, 'status', 'rejected');
          console.log('update is: ', res);
					for (let i=0; i<DATA3.length; i++) {
						if(DATA3[i].id === register.id) {
							DATA3[i].status = 'rejected';
							setRegisters(DATA3);
							break;
						}
					}
				}
        Alert.alert("Status updated to be maintaining!");
        setModalVisible(false);
    };

    const cancel = async () => {
      setModalVisible(false);
    };

    const handleModal = (log:Register) => {
			setRegister(log);
      setModalVisible(true);
        // TODO: needs handle
    }

    const onScreenLoad = async () => {
      const res = await getRegister();
      console.log(res);
      setDATA3(res);
      setRegisters(res);
      console.log("dafadf, ", DATA3)
        // TODO: axios request
    }

    useEffect(() => {
      onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:Register}) => (
      <>
        <Item log={item} />
      </>
      );
    const Item = ({log}:{log:Register}) => (
      <View style={styles2.item}>
        <Text style={styles2.title}>ID: {log.id}</Text>
        <Text style={styles2.txt}>[Name]:   {log.name}</Text>
        <Text style={styles2.txt}>[Password]:   {log.password}</Text>
        <Text style={styles2.txt}>[Role]:   {log.role}</Text>
        <Text style={styles2.txt}>[Status]:   {log.status}</Text>
        <Button onPress={ () => handleModal(log) } title="Edit" color="blue"/>
      </View>
    );

    return (
			<View style={styles.container}>
				<Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          >
					<View style={styles.centeredView}>
					<View style={styles.modalView}>
            <Text style={styles.title}>
              Approve or Reject?
            </Text>
            <View style={styles.break} />
            <View style={styles.row}>
            <Button
              onPress={() => approve()}
              title="Approve"
              color="green"
            />
            <View style={styles.break} />
            <Button
              onPress={() => reject()}
              title=" Deny "
              color="red"
            />
            <View style={styles.break} />
            <Button
              onPress={() => cancel()}
              title="Cancel"
              color="blue"
            />
            </View>
          </View>
					</View>
				</Modal>
				<View style={styles.break}></View>
				<View style={styles.break}></View>
				<Text style={styles.title}>
						Register Requests
				</Text>
				<View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
				<SafeAreaView style={styles.container}>
          <FlatList
            data={registers}
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
      padding: 25,
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