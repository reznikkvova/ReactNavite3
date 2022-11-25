// import { Component, View, Text, TouchableOpacity } from 'react-native'
// import React, { useContext } from 'react'
// import ModalFilterPicker from 'react-native-modal-filter-picker'
// import StyleSheet from 'react-native'
// import { useState } from 'react'
// import { makeStyles } from 'react-native-elements'
// import UserContext from '../../hooks/context/UserContext'

// const Picker = () => {
  
//   const [visible, setVisibility] = useState<boolean>(false);
//   const { picked, setPicked } = useContext(UserContext);

//   const options = [
//     {
//       key: 'Asset Tag',
//       label: 'Asset Tag',
//     },
//     {
//       key: 'Asset Name',
//       label: 'Asset Name',
//     },
//     {
//       key: 'Make',
//       label: 'Make',
//     },
//     {
//       key: 'Model',
//       label: 'Model',
//     },
//     {
//       key: 'Faculty/ Staff Member',
//       label: 'Faculty/ Staff Member',
//     },
//     {
//         key: 'Type of OS',
//         label: 'Type of OS',
//     },
//     {
//       key: 'Department',
//       label: 'Department',
//     },
//     {
//       key: 'Building',
//       label: 'Building',
//     },
//     {
//       key: 'Room',
//       label: 'Room',
//     },
//     {
//       key: 'Date Issued',
//       label: 'Date Issued',
//     },
//     {
//       key: 'Date Decomissioned',
//       label: 'Date Decomissioned',
//     },
//   ];

// //   function handleVisibility() {
// //     setVisibility(true)
// //   };

// //   function handleSelect(picked: string) {
// //     setPicked(picked)
// //     setVisibility(false)
// //   };

// //   function handleCancel() {
// //     setVisibility(false)
// //   };



//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.buttonContainer} onPress={handleVisibility}>
//         <Text>Select...</Text>
//       </TouchableOpacity>      
//       <Text style={styles.label}>Selected:</Text>
//       <Text>{picked}</Text>
//       <ModalFilterPicker
//         visible={visible}
//         onSelect={handleSelect}
//         onCancel={handleCancel}
//         options={options}
//       />
//     </View>
//   );

// // }

// // const styles = StyleSheet.create({
// //     container: {

// //     },
// //     buttonContainer: {

//     },
//     label: {

//     }
// })

// // export default Picker