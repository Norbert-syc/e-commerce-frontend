import axios from "axios";

const api = axios.create({
    baseURL: "https://e-commerce-api-2ckt.onrender.com/api",
    headers: {
        "Content-Type":"application/json",
    },
});

export default api;

