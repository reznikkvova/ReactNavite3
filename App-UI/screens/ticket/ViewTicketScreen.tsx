import React, { useState, Component, useEffect, useContext } from 'react';
import { Text, StyleSheet, SafeAreaView, FlatList, Modal, Button, Alert } from 'react-native';
import { View } from '../../components/Themed';
import UserContext from '../../hooks/context/UserContext';
import { styles } from '../../styles';
import Tickets from '../../models/tickets';
import { getTicket, update } from '../../remote/backend.api';


export default function ViewMemoScreen() {

    const [DATA3, setDATA3] = useState<Tickets[] | null>(null);
		const [ticket, setTicket] = useState<Tickets | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { tickets, setTickets } = useContext(UserContext);
    const [filtered, setFiltered] = useState<Tickets[] | null>(null);

    const fixed= async () => {
			const log = ticket;
			if(ticket && DATA3) {
        const res = await update('/ticket', ticket.id, 'status', 'resolved');
        console.log('update is: ', res);
				for (let i=0; i<DATA3.length; i++) {
					if(DATA3[i].id === ticket.id) {
						DATA3[i].status = 'resolved';
						setTickets(DATA3);
						break;
					}
				}
			}
			Alert.alert("Status updated to fixed!");
			setModalVisible(false);
    };

    const working = async () => {
				if(ticket && DATA3) {
          const res = await update('/ticket', ticket.id, 'status', 'fixing');
          console.log('update is: ', res);
					for (let i=0; i<DATA3.length; i++) {
						if(DATA3[i].id === ticket.id) {
							DATA3[i].status = 'fixing';
							setTickets(DATA3);
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

    const handleModal = (log:Tickets) => {
			setTicket(log);
      setModalVisible(true);
        // TODO: needs handle
    }

    const onScreenLoad = async () => {
      const res = await getTicket();
      console.log(res);
      setDATA3(res);
      setTickets(res);
      setFiltered(res);
    }

    const filterE = (status:string) => {
      let arr = [];
      if(tickets) {
        for(let i=0; i<tickets.length; i++) {
          if(tickets[i].status === status) {
            arr.push(tickets[i]);
          }
        }
      }
      setFiltered(arr);
    }

    useEffect(() => {
      onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:Tickets}) => (
      <>
        <Item log={item} />
      </>
      );
    const Item = ({log}:{log:Tickets}) => (
      <View style={styles2.item}>
        <Text style={styles2.title}>{log.date}</Text>
        <Text style={styles2.txt}>[AssetID]:   {log.asset_tag}</Text>
        <Text style={styles2.txt}>[Issue]:   {log.issue}</Text>
        <Text style={styles2.txt}>[Room]:   {log.room}</Text>
        <Text style={styles2.txt}>[Status]:   {log.status}</Text>
        <Text style={styles2.txt}>[Technician]:   {log.technician}</Text>
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
								Status update?
							</Text>
							<View style={styles.break} />
							<View style={styles.row}>
							<Button
								onPress={() => fixed()}
								title="Resolved"
								color="green"
							/>
							<View style={styles.break} />
							<Button
								onPress={() => working()}
								title="Fixing"
								color="blue"
							/>
							<View style={styles.break} />
							<Button
								onPress={() => cancel()}
								title="Cancel"
								color="red"
							/>
							</View>
						</View>
					</View>
				</Modal>
				<View style={styles.break}></View>
				<View style={styles.break}></View>
				<Text style={styles.title}>
						Tickets
				</Text>
				<View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.break} />
        <View style={styles.row}>
          <Button
          onPress={() => filterE('waiting')}
          title="Waiting"
          color="green"
          />
          <View style={styles.break} />
          <Button
            onPress={() => filterE('fixing')}
            title="Fixing"
            color="blue"
          />
          <View style={styles.break} />
          <Button
            onPress={() => filterE('resolved')}
            title="Resolved"
            color="red"
          />
        </View>
        <View style={styles.break} />
				<SafeAreaView style={styles.container}>
						<FlatList
								data={filtered}
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
      marginVertical: 5,
      marginHorizontal: 5,
      padding:10,
      paddingRight:50,
      paddingLeft:50,
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