import axios from "axios";

const instance = axios.create({
  baseURL: '/api/',
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export default instance;
