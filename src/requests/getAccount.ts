import axios, { AxiosRequestConfig } from 'axios';


export const getAccount = (env:any, id: string): Promise<any> =>
  new Promise((resolve, reject) => {
    var config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.ebay-kleinanzeigen.de/api/users/public/${id}/profile`,
      headers: {
        Authorization: env.EBAY_AUTH,
        Cookie:
          'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE',
      },
    };

    axios(config)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
        reject(error);
      });
  });
