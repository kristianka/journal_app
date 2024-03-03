import axios from "axios";

// get yours on windows by running
// ipconfig
const api = axios.create({
    baseURL: "http://192.168.0.20:3000/"
});

export default api;
