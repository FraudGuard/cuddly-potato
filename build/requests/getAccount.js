"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccount = void 0;
var axios_1 = __importDefault(require("axios"));
var getAccount = function (id) { return new Promise(function (resolve, reject) {
    var config = {
        method: 'get',
        url: "https://api.ebay-kleinanzeigen.de/api/users/public/" + id + "/profile",
        headers: {
            'Authorization': 'Basic aXBob25lOmc0Wmk5cTEw',
            'Cookie': 'route_fd70c0ed_16ee_459c_bd9d_46eecb4b8177=577ffe497406170d42be9f640928dafa; GCLB=CJqBz-GEuMXB7gE'
        }
    };
    axios_1.default(config)
        .then(function (response) {
        resolve(response.data);
    })
        .catch(function (error) {
        console.log(error.response.data);
        reject(error);
    });
}); };
exports.getAccount = getAccount;
