import User from "../models/user";
import Log from "../models/log";
import backClient from "./backend.client";
import Tickets from '../models/tickets';
import Memo from '../models/memo';
import Asset from '../models/asset';
import Register from "../models/register";
import Commentx from "../models/comments";
import { Auth } from "aws-amplify";


interface Error {
  message: string;
}

export const sendLogin = async (username: string, password: string): Promise<User> => {
  console.log(username, password);

  const session = await Auth.currentSession();

  const { data: user } = await backClient.post<User>('/login', {
    username,
    password,
  }, {
    headers: {
      Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
    }
  });

  console.log(user);
  return user;
}

export const getAllUsers = async () => {
  const { data:user  } = await backClient.get('/user');
  return user;

}

// export const getUser = async (id:string): Promise<User> => {
//   const response = await backClient.get('/user', {id});
//   return response.data as User;
// }


export const registerUser = async(id:string, role:string): Promise<boolean> => {
  const response = await backClient.put('/user/register', {id, role});

  if(response) {
    console.log(response)
    return true;
  }
    console.log(response)
  return false;
}

export const register = async (): Promise<String> => {
  const { data: message } = await backClient.put('/register');
  return message.register;
}

export const getLog = async (tag:string): Promise<Log[]> => {
  const { data: response } = await backClient.get('/log');
  let filter = response.data as Log[];
  filter = filter.filter(log => log.asset_tag == tag);
  return filter;
}

export const getComments = async (id:string): Promise<Commentx[]> => {
  const { data: response } = await backClient.get('/comment');
  let filter = response.data as Commentx[];
  filter = filter.filter(comment => comment.memo_id == id);
  return filter;
}

export const getTicket = async () => {
  const { data: response } = await backClient.get('/ticket');
  return response.data as Tickets[];
}

export const getMemo = async (): Promise<Memo[]> => {
  const { data: response } = await backClient.get('/memo');
  return response.data as Memo[];
}

export const getAsset = async (): Promise<Asset[]> => {
  const { data: response } = await backClient.get('/asset');
  return response.data as Asset[];
}

export const getRegister = async () => {
  const { data: response }  = await backClient.get('/register');
  return response.data as Register[];
}

export const update = async (path:string, id:string, what:string, change:string) => {
  const response = await backClient.patch(path, {id, what, change});
  return response;
}

export const deleteStuff = async (path:string, id:string) => {
  const response = await backClient.post(path, {id});
  return response;
}

export const addAsset = async (as:Asset) => {
  const response = await backClient.put('/asset', {...as});
  return response;
}

export const addLog = async (as:Log) => {
  const response = await backClient.put('/log', {...as});
  return response;
}

export const addMemo = async (as:Memo) => {
  const response = await backClient.put('/memo', {...as});
  return response;
}

export const addTicket = async (as:Tickets) => {
  const response = await backClient.put('/ticket', {...as});
  return response;
}

export const addRegister = async (as:Register) => {
  const response = await backClient.put('/register', {...as});
  return response;
}

export const addComment = async (as:Commentx) => {
  const response = await backClient.put('/comment', {...as});
  return response;
}
