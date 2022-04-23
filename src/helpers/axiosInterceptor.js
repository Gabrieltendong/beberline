import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useState } from "react";
import env from "../configs/env";

let headers = {

};

let paymentHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": "Basic EPkITb8mc23x8YtrKmmnD3ddLTuzJLyo-oy2dOT_XigUxwptZJNfZbP6JSR5G93qoM8nhUc0ViNHl2bU"
   
 }

 export const paypalInstance = axios.create({
    url: "",
    headers: paymentHeaders
})


const PAYMENT_API = "https://be-berline.herokuapp.com/payments/"

console.log('env.BACKEND_URL',env.BACKEND_URL)

const axiosInstance = axios.create({
    baseURL: env.BACKEND_URL,
    headers,
})

export const axiosPaymentInstance = axios.create({
    baseURL: PAYMENT_API,
    headers,
})



axiosInstance.interceptors.request.use(
    async ( config ) => {
        const token = await AsyncStorage.getItem("token")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },

    ( error ) => {
        return Promise.reject(error)
    }
)

 export default axiosInstance;