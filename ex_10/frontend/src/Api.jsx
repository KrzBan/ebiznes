import axios from 'axios'

const BASE_URL = "http://localhost:5000";
const TOKEN_NAME = "jwtToken"

const getToken = () =>{
    return window.sessionStorage.getItem(TOKEN_NAME);
}
const setToken = (token) =>{
    return window.sessionStorage.setItem(TOKEN_NAME, token);
}

const api = axios.create({
    headers: {
        "Content-Type": "application/json",
    },
    baseURL: BASE_URL,
    timeout: 20000
});
  
api.interceptors.request.use(
    config => {
        config.headers["Authorization"] = "Bearer " + getToken();
        return config;
    },

    error => {
        Promise.reject(error);
    }
);

export { api, getToken, setToken }