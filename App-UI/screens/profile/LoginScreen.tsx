import React, { useState, useContext } from 'react';
import UserContext from '../../hooks/context/UserContext';
import { Button, ImageBackground, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../../components/Themed';
import { useNavigation } from '@react-navigation/native';
import User from '../../models/user';
import { styles } from '../../styles';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { getAllUsers } from '../../remote/backend.api';

const LoginScreen: React.FC<unknown> = () => {
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
 
  // const { authenticate } = useContext(AccountContext);
  
  const { setAuthenticated, setRole, setUser, user, authenticated, role } = useContext(UserContext);
  const nav = useNavigation();

// const url = "https://1u0w2v288k.execute-api.us-east-1.amazonaws.com/dev/user"

  const handleLogin = async () => {
    // sessionStorage.setItem('user', JSON.stringify(response));
    // if statement to verify
    // setAuthenticated(true);
    // setUser(username);
    // nav.navigate('Home');
    // authenticate(username, password)
    //   .then(data => {
    //     console.log('Logged in', data);
    //   })
    //   .catch(err => {
    //     console.error('Failed to Login', err)
    //   })
    console.log('right before auth');
    await Auth.signIn(username, password);
    console.log('right after auth');
    const userID = username;
    console.log(userID);
    //navigate home
    const res = await getAllUsers();
    console.log(res.data);
    await filterUsers(res.data, userID);
    nav.navigate('Home');
    // let user1;
    // for(let i=0; i<res.length; i++){
    //   if(res[i].id === userID){
    //     user1=res[i];
    //     console.log('inside the for loop')
    //     setRole(user1.role);
    //     setUser(user1.id);
    //     setAuthenticated(true);
    //     nav.navigate('Home');
    //     break;
    //   }
    // }
   console.log('outside the for loop')
   console.log(role)
   console.log(user)
  };
  
  function filterUsers(arr: User[], person: string) {
    console.log('inside the filter func');
    for(let i=0; i<arr.length; i++){
      if(arr[i].id === person){
        let user1=arr[i];
        console.log('inside the for loop')
        setRole(user1.role);
        setUser(user1.id);
        setAuthenticated(true);
        nav.navigate('Home');
        break;
      }
    }
  }

  const handleLogout = async () => {
    // const response = axios
    await Auth.signOut()
      .catch((err) => {
        console.log('ERROR: ', err);
      });
      setAuthenticated(false);
    //set context authenticated to false
    nav.navigate('Home');
    }

  // function getDynamoUser() {
  //   //set id = username
  //   const userID = user.username
  //   //get user from db table with id 
  //   await getUser()
  //   //save role of user to context 
    
  // }


  return (
    <ImageBackground source={require('../../assets/images/pic7.jpg')} style={styles1.image}>
    <View style={styles1.container}>
        
        { authenticated &&
            <>
            <Text style={styles.title}>
                Logged-In as { user }
            </Text>
            <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
            <Button
                title="Logout"
                color="blue"
                onPress={ () => handleLogout() }
            ></Button>
            </>
        }
        { !authenticated &&
            <>
            <Text style={styles.title}>Log In:</Text>
            <View style={styles.separator} lightColor="blue" darkColor="rgba(255,255,255,0.1)" />
            <View style={{ width: '100%', padding: 25, backgroundColor: 'transparent',}}>
                <TextInput
                style={styles.textInput1}
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                defaultValue={username}
                />
                <TextInput
                style={styles.textInput1}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                defaultValue={password}
                />
                <View style={styles.break} />
                <Button
                onPress={handleLogin}
                title="Sign in"
                color="blue"
                />
                <Text
                style={{
                    color: 'blue',
                    padding: 10,
                    textAlign: 'right'
                }}
                onPress={() => {
                    nav.navigate('RegisterScreen');
                }}
                >
                Register
                </Text>
            </View>
            </>
        }
    </View >
    </ImageBackground>
  );
}


const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 20,
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


export default LoginScreen;