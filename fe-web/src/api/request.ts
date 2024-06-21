import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const TIME_OUT = 60000;

const baseApiConfig = {
  baseURL: "http://127.0.0.1:3001/",
  headers: {
    ['content-type']: 'application/json',
    ['accept']: 'application/json',
  },
  timeout: TIME_OUT,
};

const request = axios.create(baseApiConfig);

request.interceptors.request.use(config => {

  return config;
});

request.interceptors.response.use(
  response => response,
  error => {
    throw new Error(error);
  }
);

export default request;