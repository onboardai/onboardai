import axios from "axios";

const api = axios.create({
    baseURL: "https://back-agox.onrender.com/api"
});

export default api;