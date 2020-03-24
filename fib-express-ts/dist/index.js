"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var redis_1 = __importDefault(require("redis"));
require("reflect-metadata");
var util_1 = __importDefault(require("util"));
var cors_1 = __importDefault(require("cors"));
var typeorm_1 = require("typeorm");
var Value_1 = require("./entity/Value");
var KEYS = __importStar(require("./keys"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
var setupRedis = function () { return __awaiter(void 0, void 0, void 0, function () {
    var redisClient, redisPublisher;
    return __generator(this, function (_a) {
        redisClient = redis_1.default.createClient({
            host: KEYS.REDIS_HOST,
            port: KEYS.REDIS_PORT,
            retry_strategy: function () { return 1000; }
        });
        redisPublisher = redisClient.duplicate();
        return [2 /*return*/, { redisClient: redisClient, redisPublisher: redisPublisher }];
    });
}); };
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var connection_1, _a, redisClient_1, redisPublisher_1, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                return [4 /*yield*/, typeorm_1.createConnection({
                        type: 'postgres',
                        host: KEYS.PG_HOST,
                        port: KEYS.PG_PORT,
                        username: KEYS.PG_USER,
                        password: KEYS.PG_PASSWORD,
                        database: KEYS.PG_DB,
                        entities: [Value_1.Value],
                        logging: false
                    })];
            case 1:
                connection_1 = _b.sent();
                return [4 /*yield*/, setupRedis()];
            case 2:
                _a = _b.sent(), redisClient_1 = _a.redisClient, redisPublisher_1 = _a.redisPublisher;
                app.get('/', function (req, res) {
                    res.send('Hi');
                });
                app.get('/values/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var allValues, indices;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connection_1.manager.find(Value_1.Value)];
                            case 1:
                                allValues = _a.sent();
                                indices = allValues.map(function (value) { return value.index; });
                                res.send(indices.toString());
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.get('/values/current', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var hgetAll, values;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                hgetAll = util_1.default.promisify(redisClient_1.hgetall);
                                return [4 /*yield*/, hgetAll('values')];
                            case 1:
                                values = _a.sent();
                                res.send(values);
                                return [2 /*return*/];
                        }
                    });
                }); });
                app.post('/values', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
                    var index, value;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                index = req.body.index;
                                if (parseInt(index) > 40) {
                                    return [2 /*return*/, res.status(422).send('Index too high')];
                                }
                                redisClient_1.hset('values', index, 'Nothing yet!');
                                redisPublisher_1.publish('insert', index);
                                value = new Value_1.Value();
                                value.index = parseInt(index);
                                return [4 /*yield*/, connection_1.manager.save(value)];
                            case 1:
                                _a.sent();
                                console.log('Value saved successfully!');
                                res.send({ success: true });
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); })();
app.listen(5000, function () {
    console.log('Magic happens on 5000');
});
