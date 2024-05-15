import axios from "axios";

export default axios.create({
    //base para local
    baseURL: 'http://localhost:8080'

    //base para servidor
    //baseURL: 'http://200.234.236.135:8080'
});
