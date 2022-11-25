import { Button } from 'react-native-elements';
import React, { ChangeEvent, FormEvent, useContext, useState } from 'react';
import UserContext from '../../hooks/context/UserContext';
import { TextInput, View, Text } from 'react-native';
import { styles } from '../../styles';



const Searchbar = () => {
    const [search, setSearch] = useState<string>('')
    const { assets, logs, memos, tickets, registers, picked, setPicked } = useContext(UserContext)

    const updateSearch = (input: string) => {
    setSearch(input);
  };

    const handleSearch = async() => {
      //get request or filterResults()
    }

    // function filterResults() {
    //   if (assets) {
    //     assets.forEach((asset) => {
    //       if (search == asset) {
    //           console.log(asset)
    //           //store assets in a new Array
  
    //           //render list 
    //           arr.map((item, index) => (
    //             //dynamically render 
    //             <tr key= {index}>
    //               <td>{item.id}</td>
    //               <td>{item.category}</td>
    //               { /* etc */}
    //             </tr>
    //           ))
    //       }
    //     })
    //   }
      
    // }



  return (
    <>
      <Text style={styles.title}>Search:</Text>
            <View style={{ width: '100%', padding: 25, }}>
                <TextInput
                style={styles.textInput1}
                placeholder="Search"
                onChangeText={text => setPicked(text)}
                value={search}
                />
            </View>
      <Button
        onPress={() => handleSearch()}
        title="Search"
        />
    </>
    )
  
}



export default Searchbar
