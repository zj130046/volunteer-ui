import axios from 'axios';
import store from '@/store';
import { getToken } from '@/utils/auth';
import { Notification } from 'element-ui';

const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 20000 // request timeout
});

// request interceptor
service.interceptors.request.use(
    config => {
        // do something before request is sent

        if (getToken()) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            config.headers.token = getToken();
        }
        return config;
    },
    error => {
        // do something with request error
        console.log(error); // for debug
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        const res = response.data;
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 0 && res.code != 10000 && res.code != undefined) {
            if (res.code == 11 || res.code == 12) {
                location.reload();
            }
            Notification({
                title: res.msg,
                type: 'error'
            });
            return Promise.reject(new Error(res.msg || 'Error'));
        } else {
            return res;
        }
    },
    error => {
        Notification({
            title: '网络错误',
            message: error.msg
        });
        return Promise.reject(error);
    }
);

export default service;