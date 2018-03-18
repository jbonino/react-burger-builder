import axios from "axios";

const instance = axios.create({
    baseURL: 'https://react-burger-fec01.firebaseio.com/'
})

export default instance;