import axios, { AxiosRequestConfig } from 'axios';
require('dotenv').config()

export const getAccount = (id: string): Promise<any> => new Promise((resolve, reject) => {
    var config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.ebay-kleinanzeigen.de/api/users/public/${id}/profile`,
        headers: {
            'Authorization': process.env.EBAY_AUTH,
            'Cookie': 'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE'
        }
    };

    axios(config)
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            console.log(error.response.data)
            reject(error);
        });
})