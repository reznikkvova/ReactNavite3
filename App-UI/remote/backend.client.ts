import axios from 'axios';

const backClient = axios.create({
  baseURL: 'https://1u0w2v288k.execute-api.us-east-1.amazonaws.com/dev',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
});

export default backClient;
