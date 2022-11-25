// import React, { useEffect, useContext, useState } from "react";
// import { CognitoUserAttribute } from "amazon-cognito-identity-js";
// import { AccountContext } from "./Accounts";
// import { TextInput } from "react-native";

//  const Attributes = () => {
//   const [role, setRole] = useState<string>("");

//   const { getSession } = useContext(AccountContext);

//   useEffect(() => {
//     getSession().then((data) => {
//       setRole(data["custom:role"]);
//     });
//   }, []);

//   const onSubmit = (event) => {
//     event.preventDefault();

//     getSession().then(({ user }) => {
//       const attributes = [
//         new CognitoUserAttribute({ Name: "custom:role", Value: role }),
//       ];

//       user.updateAttributes(attributes, (err, result) => {
//         if (err) console.error(err);
//         console.log(result);
//       });
//     });
//   };

//   return (
//     <>
//         <TextInput
//             style={styles.textInput1}
//             placeholder="Name"
//             onChangeText={text => setRole(text)}
//         />
//     </>
//   )
// };

// export default Attributes;