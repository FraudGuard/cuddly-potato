"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var getList_1 = require("./requests/getList");
var getSingle_1 = require("./requests/getSingle");
var mongodb = __importStar(require("./services/mongodb"));
var axios_1 = __importDefault(require("axios"));
var init = function () { return __awaiter(void 0, void 0, void 0, function () {
    var list, resLego, listDyson, resDyson, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, mongodb.init()
                // await mongodb.dropAndCreateCollection('ads')
            ];
            case 1:
                _c.sent();
                return [4 /*yield*/, getList_1.getList("&q=" + encodeURIComponent('lego') + "&minPrice=150.00")];
            case 2:
                list = _c.sent();
                console.log('list loaded');
                return [4 /*yield*/, handleList(list, 'lego')];
            case 3:
                resLego = _c.sent();
                console.log('lego done', resLego);
                return [4 /*yield*/, getList_1.getList("&q=" + encodeURIComponent('dyson airwrap') + "&minPrice=150.00")];
            case 4:
                listDyson = _c.sent();
                console.log('list loaded');
                return [4 /*yield*/, handleList(list, 'dyson')];
            case 5:
                resDyson = _c.sent();
                console.log('dyson done', resDyson);
                if (!(resLego.errors > 0 || resDyson.errors > 0)) return [3 /*break*/, 7];
                _b = (_a = console).log;
                return [4 /*yield*/, postMessageToTeams('RunSuccess', "lego: " + JSON.stringify(resLego) + ", dyson: " + JSON.stringify(resDyson))];
            case 6:
                _b.apply(_a, [_c.sent()]);
                _c.label = 7;
            case 7:
                process.exit();
                return [2 /*return*/];
        }
    });
}); };
var handleList = function (list, searchQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var success, errors, _i, list_1, l, element;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                success = 0;
                errors = 0;
                _i = 0, list_1 = list;
                _a.label = 1;
            case 1:
                if (!(_i < list_1.length)) return [3 /*break*/, 5];
                l = list_1[_i];
                return [4 /*yield*/, getSingle_1.getSingle(l.id).catch(function (err) {
                        console.log('errorGetSingle', err.message);
                        ++errors;
                    })];
            case 2:
                element = _a.sent();
                if (!element) return [3 /*break*/, 4];
                ++success;
                return [4 /*yield*/, mongodb.insertOrUpdateAd(__assign(__assign({}, element), { searchQuery: searchQuery }))
                    // await new Promise(resolve => setTimeout(() => resolve({}), 2000))
                    // const account = await getAccount(element['user-id'].value).catch(err => {
                    //     console.log('errorGetAccount', err.message)
                    // })
                    // if (account)
                    //     await mongodb.insertOrUpdateAccount(account)
                ];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/, { success: success, errors: errors }];
        }
    });
}); };
function postMessageToTeams(title, message) {
    return __awaiter(this, void 0, void 0, function () {
        var webhookURL, card, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    webhookURL = "https://inncodedde.webhook.office.com/webhookb2/939850bc-8c86-4520-8701-921f21cd1134@1f5ef628-ef5c-4705-a562-ceb46b471853/IncomingWebhook/62824d888812440b9729ac150db2bb09/b51476fc-4d1b-4359-8717-ec123f87c7e6";
                    card = {
                        '@type': 'MessageCard',
                        '@context': 'http://schema.org/extensions',
                        'themeColor': "0072C6",
                        summary: 'Summary description',
                        sections: [
                            {
                                activityTitle: title,
                                text: message,
                            },
                        ],
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, axios_1.default.post(webhookURL, card, {
                            headers: {
                                'content-type': 'application/vnd.microsoft.teams.card.o365connector',
                                'content-length': "" + card.toString().length,
                            },
                        })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.status + " - " + response.statusText];
                case 3:
                    err_1 = _a.sent();
                    return [2 /*return*/, err_1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
init();
