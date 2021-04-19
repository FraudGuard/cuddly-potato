import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
const result = dotenv.config();
if (result.error !== undefined) {
  throw result.error;
}

export const getList = (query: string): Promise<any> =>
  new Promise((resolve, reject) => {
    var config: AxiosRequestConfig = {
      method: 'get',
      url: `https://api.ebay-kleinanzeigen.de/api/ads.json?histograms=CATEGORY&includeTopAds=true&limitTotalResultCount=true&locationId=0${query}&size=200`,
      headers: {
        Authorization: process.env.EBAY_AUTH,
        Cookie:
          'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE',
      },
    };

    axios(config)
      .then((response) => {
        resolve(
          response.data['{http://www.ebayclassifiedsgroup.com/schema/ad/v1}ads']
            .value.ad
        );
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
