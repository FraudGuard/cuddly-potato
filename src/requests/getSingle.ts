import axios, { AxiosRequestConfig } from 'axios';

export const getSingle = (id: string): Promise<any> => new Promise((resolve, reject) => {
    var config: AxiosRequestConfig = {
        method: 'get',
        url: `https://api.ebay-kleinanzeigen.de/api/ads/${id}.json`,
        headers: {
            'Authorization': 'Basic aXBob25lOmc0Wmk5cTEw',
            'Cookie': 'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE'
        }
    };

    axios(config)
        .then((response) => {
            resolve(response.data["{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ad"].value);
        })
        .catch((error) => {
            console.log(error.body)
            reject(error);
        });
})