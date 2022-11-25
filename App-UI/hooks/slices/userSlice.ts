// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
// import { RootState } from "../store";
// import { getAllUser, sendLogin } from "../../remote/backend.api";
// import { AxiosError } from 'axios';
// import Auth from '@aws-amplify/auth';
// import { CognitoUser } from '@aws-amplify/auth';
// import User from '../../models/user';

// export type UserState = User | null;

// export type LoginCredentials = {
//   username: string;
//   password: string;
// }

// export function isAxiosError(error: any): error is AxiosError {
//   return "isAxiosError" in error;
// }

// // export const loginAsync = createAsyncThunk<UserState, LoginCredentials>(
// //   'user/login/async',
// //   async ({username, password}, thunkAPI) => {

// //     try {
// //       const user: UserState = await Auth.signIn(username, password);

// //       console.log(user);

// //       return user;

// //     } catch(error) {
// //       // console.log(`error is an AxiosError: ${isAxiosError(error)}`);
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );

// // export const loginAsync = createAsyncThunk<User, LoginCredentials>(
// //   'user/login/async',
// //   async ({}, thunkAPI) => {

// //     try {
// //       const response = await getUser();

// //       return response;
// //     } catch(error) {
// //       return thunkAPI.rejectWithValue(error);
// //     }
// //   }
// // );



// export const userSlice = createSlice({
//   name: 'user',
//   initialState: null as UserState,
//   reducers: {
//     login: (state, action: PayloadAction<UserState>) => {
//       return action.payload;
//     },
//     logout: (state) => {
//       return null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginAsync.pending, (state) => {
//         // return null;
//       })
//       .addCase(loginAsync.fulfilled, (state, action) => {
//         return action.payload;
//       })
//       .addCase(loginAsync.rejected, (state, action) => {
//         console.log(action.error);
//       });
//   },
// });

// // Action creators are generated for each case reducer function
// export const { login, logout } = userSlice.actions;
// export const selectUser = (state: RootState) => state.user;
// export default userSlice.reducer;