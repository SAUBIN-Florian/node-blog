import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://blog-node-flo.herokuapp.com/"
});