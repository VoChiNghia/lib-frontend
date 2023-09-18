import axios, { AxiosRequestConfig } from "axios";
export const TOKEN = "accessToken";
export const USER = "user";
export const ID = "id";
export const API_KEY = 'AIzaSyDXW-0lI8Opo0Nqx8F4sfnSRTIAieJRhqU'

const http = axios.create({
  baseURL: "http://146.190.81.56/v1",
  // baseURL: "https://library-vyr7.onrender.com/v1",
});


// export const interceptorsRequest = (id:string,token:string) => {
//   http.interceptors.request.use((config: any) => {
//     config.headers["authorization"] = token
//     config.headers["x-client-id"] = id
  
//     return config;
//   })
// }

export const getStoreJson = (name:any)=>{
  if(localStorage.getItem(name)){
     const dataStore = localStorage.getItem(name)
      if(typeof dataStore === 'string'){
        return JSON.parse(dataStore)
      }
  }
  return null
}

http.interceptors.request.use((config) => {
  config.headers["authorization"] = JSON.parse(localStorage.getItem(TOKEN) as string) 
    config.headers["x-client-id"] = JSON.parse(localStorage.getItem(ID) as string) 
  return config
},(err) => {
  return Promise.reject(err)
})
export default http;
