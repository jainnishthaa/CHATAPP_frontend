import axios from "axios";

const instance = axios.create({
    baseURL: 'https://chatapp-backend-fawn.vercel.app',
    withCredentials: true
});


export default instance;