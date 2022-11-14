import axios from "axios";
import REACT_APP_API_URL from "../../env";

const api = axios.create({
    baseURL: 'https://equipoyosh.com/',
    headers: {
        get: {
            "Content-Type": "application/json",
        },
        post: {
            "Content-Type": "application/json",
        },
        put: {
            "Content-Type": "application/json",
        },
        common: {
            "Content-Type": "application/json",
        },
    },
});

export default api;
