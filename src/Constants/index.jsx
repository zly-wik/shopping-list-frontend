import axios from "axios";
import cookie from "react-cookies";
import { Link } from "react-router-dom";

export const API_URL = "http://localhost:8000/";

export const csrfToken = cookie.load("csrftoken");

axios.interceptors.request.use(
    function (config) {
        config.headers.Authorization = sessionStorage.getItem("access");
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const logout = () => {
    sessionStorage.removeItem("access");
};
