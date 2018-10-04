import axios from "axios";


export default axios.create({
  baseURL: 'http://localhost:8080',
  withCredentials: true
})

// var instance = axios.create({
//     baseURL: 'http://localhost:5000',
// });
