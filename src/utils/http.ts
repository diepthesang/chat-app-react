import axios, {AxiosInstance, InternalAxiosRequestConfig} from "axios";
import {TIME_OUT} from "../constant/constant";
import {getBearerAccessToken, getBearerRefreshToken} from "../common/local-storage";
import {Auth} from "../api/auth/auth";

export class Http {
    public instance: AxiosInstance;

    constructor() {
        this.instance = axios.create({
                baseURL: 'http://localhost:8080/',
                // baseURL: '192.168.0.101:8080/',
                timeout: TIME_OUT,
                headers: {
                    "Content-Type": 'application/json',
                },
            }
        );

        this.instance.interceptors.request.use(function (config: InternalAxiosRequestConfig) {
            if (config.url === '/auth/retrieve_access_token') {
                config.headers.Authorization = getBearerRefreshToken()
                return config
            }
            config.headers.Authorization = getBearerAccessToken();
            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        });

        this.instance.interceptors.response.use((response: any) => {
            return response;
        }, async (error) => {
            try {
                console.log({error_http: error})
                if (error.response.data.statusCode === 401 && error.response.data.message === 'Unauthorized') {
                    let config = error.response.config as any;
                    const response = await Auth.retrieveAccessTokenByRefreshToken(`${getBearerRefreshToken()}`);
                    localStorage.setItem('access_token', `Bearer ${response.data.data.access_token}`);
                    config.headers.Authorization = getBearerAccessToken();
                    return await this.instance(config);
                }
                return Promise.reject(error);
            } catch (error) {
                console.log({error_this_instance_interceptors_response: error})
            }
        });

    }
}

export const http = new Http().instance;
