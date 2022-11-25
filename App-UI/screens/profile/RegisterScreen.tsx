import React, { useCallback, useContext } from 'react';
import { useState } from 'react';
import { Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NativeUploady, { UploadyContext } from "@rpldy/native-uploady";
// import DocumentPicker from 'react-native-document-picker';
import { styles } from '../../styles';
import UserPool from '../../cognito/attributes/UserPool';
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Auth from '@aws-amplify/auth';
import User from '../../models/user';
import { register, registerUser } from '../../remote/backend.api';

const RegisterScreen: React.FC<unknown> = (props) => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [role, setRole] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [experience, setExperience] = useState<number>(0);
  const [invalidMessage, setInvalidMessage] = useState<string>('')

  const uploadyContext = useContext(UploadyContext);
  const nav = useNavigation();

  // let attributeList: CognitoUserAttribute[] = [];

  // let userRole = {
  //   Name: 'custom:role',
  //   Value: role
  // };

  // let roleAttribute = new CognitoUserAttribute(userRole);
  // attributeList.push(roleAttribute);
  

  const handleRegister = async () => {
    Alert.alert('handle register.');
    // needs handle
    // UserPool.signUp(username, password, attributeList, null, (err, data) => {
    //   if(err) console.log(err);
    //   console.log(data)
    // });

   
    

    Auth.signUp({
      username, 
      password,
      //add attributes optional
      attributes: {
        email,
        name,
      },
      validationData: [],
    })
      .then(async () => {
         //create user and send to dynamo table
        const id = username;
        const newUser = new User(id, role)
        const result = await registerUser(id, role);
        if (result) {
        console.log('successfully created account')
      } else {
        console.log('unable to register')
      }
      
      })
      .then(/*navigate to home */)
      .catch((err) => {
        if (err.message) {
          setInvalidMessage(err.message)
        }
      })
  };

  // const Upload = () => {
  //   const pickFile = useCallback(async () => {
  //       const res = await DocumentPicker.pick( {
  //         type: [DocumentPicker.types.pdf],
  //       });
  //       // @ts-ignore
  //       uploadyContext.upload(res); // doesnt work
  //   }, [uploadyContext]);
  //     return (
  //           <View style={{ margin: 10, width:'30%' }}>
  //               <Button title="Upload Resume" onPress={ pickFile } />
  //           </View>
  //     )
  // };

  return (
    <View style={styles.container}>
        <>
          <Text style={styles.title}>Register</Text>
          <View style={styles.separator} lightColor="blue" />
          <View style={{ width: '100%', padding: 30, }}>
            <TextInput
              style={styles.textInput1}
              placeholder="Name"
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Username"
              onChangeText={text => setUsername(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Phone Number"
              onChangeText={text => setPhoneNumber(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Email"
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Years of Experience"
              onChangeText={text => setExperience(Number(text))}
            />
            <TextInput
              style={styles.textInput1}
              placeholder="Role"
              onChangeText={text => setRole(text)}
            />
            <NativeUploady    
                grouped
                maxGroupSize={1}
                method="PUT"
                destination={{url: "https://my-server", headers: {"x-custom": "123"}}}>
                {/* <Upload/>            */}
            </NativeUploady>
            <View style={styles.break} />
             <Button
              onPress={() => handleRegister()}
              title="Register"
              color="blue"
            /> 
            <Text
              style={{
                color: 'blue',
                padding: 10,
                textAlign: 'right'
              }}
              onPress={() => nav.navigate('LoginScreen')}
            >
              Login
            </Text>
          </View>
        </>
    </View >
  );
            }

export default RegisterScreen;