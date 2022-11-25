import React, { useState, useContext, useEffect } from 'react';
import { styles } from '../../styles';
import { Text, View } from '../../components/Themed';
import ViewLogScreen from '../../screens/log/ViewLogScreen';
import { Alert, Button, FlatList, Modal, SafeAreaView, ScrollView, StatusBar,  StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import UserContext from '../../hooks/context/UserContext';
import Asset from '../../models/asset';
import { addComment, deleteStuff, getAsset, getComments } from '../../remote/backend.api';
import Memo from '../../models/memo';
import Commentx from '../../models/comments';
import uuid from 'react-native-uuid';


const DetailMemoScreen: React.FC<unknown> = () => {
  const { memo, setMemos, user } = useContext(UserContext);
  const [onLoadText, setText] = useState("");
  const [comment, setComment] = useState("");
  const [commentss, setCommentss] = useState<Commentx[]|null>(null);
  const nav = useNavigation();

  const setComments = async () => {
    const res = await getComments(memo.id);
    setCommentss(res);
  }
    const handleSubmit = async () => {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      const newC = new Commentx('comment', String(uuid.v4()), memo.id, today.toLocaleDateString(), user, comment);
      const res = await addComment(newC);
      setComments();
    }

    const onScreenLoad = () => {
        setComments();
    }
    
    useEffect(() => {
        onScreenLoad();
    }, [])

    const renderItem = ({item}:{item:any}) => (
      <>
        <Item2 comment={item} />
      </>
    );

    const Item = ({data}:{data:Memo}) => (
      <View style={styles2.item}>
        <Text style={styles2.title}>{data.date}</Text>
        <Text style={styles2.txt}>[{data.user}]:  {data.message}</Text>
      </View>
    );

    const Item2 = ({comment}:{comment:Commentx}) => (
      <View style={styles2.asset}>
        <Text style={styles2.txt}>[{comment.user}]: {comment.date}</Text>
        <Text style={styles2.txt}>{comment.message}</Text>
      </View>
  )
      
    return (
        <>
        <View style={styles.container}>
        <View style={styles.break}></View>
        <Text style={styles.title}>
            Thread
        </Text>
        <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
            <View>
                <Item data={memo as Memo}/>
            </View>
            <View style={styles.separatorS} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />

            <SafeAreaView style={styles.container}>
              <FlatList
                data={commentss}
                initialNumToRender={1}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </SafeAreaView>

            <View style={{ width: '100%', padding: 30, }}>
              <TextInput
                style={styles.textInput1}
                onChangeText={text => setComment(text)}
              />
              <Button
              onPress={() => handleSubmit()}
              title="Submit"
              color="blue"
              />
            </View>
        </View>
    </>
    );
}
export  const styles2 = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#D3D3D3',
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
    textAlign: 'center',
  },
  txt: {
      fontSize: 15,
      textAlign: 'left',
      marginLeft: 5,
  },
  asset:{
    backgroundColor: 'white',
    padding: 6,
    marginVertical: 5,
    marginHorizontal: 5,
    width:400,
    
  }
});


export default DetailMemoScreen;