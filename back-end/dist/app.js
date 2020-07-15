"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./route/router"));
require("./controller/getCrawlerDataController");
var app = express_1.default();
var port = 8001;
app.use(router_1.default);
app.listen(port, function () {
    console.log("server is running at http://localhost:" + port);
});
