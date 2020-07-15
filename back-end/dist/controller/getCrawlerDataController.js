"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var decorator_1 = require("../decorator/");
var utils_1 = require("../utils/utils");
var analyzer_1 = __importDefault(require("../utils/analyzer"));
var crawler_1 = __importDefault(require("../utils/crawler"));
var getCrawlerDataController = /** @class */ (function () {
    function getCrawlerDataController() {
    }
    getCrawlerDataController.prototype.getCrawlerInfo = function (req, res) {
        var dataPath = path_1.default.resolve(__dirname, "../../data/crawlerData.json");
        var pages = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225];
        var startIndex = Number(req.query.page) - 1;
        var startPage = pages[startIndex];
        var url = "https://movie.douban.com/top250?start=" + startPage + "&filter=";
        var analyzer = analyzer_1.default.get();
        new crawler_1.default(url, analyzer);
        try {
            var result = JSON.parse(fs_1.default.readFileSync(dataPath, "utf-8"));
            res.json(utils_1.getResponseData(result));
        }
        catch (error) {
            res.json(utils_1.getResponseData([], true, "数据不存在！"));
        }
    };
    __decorate([
        decorator_1.get("/getCrawlerInfo"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], getCrawlerDataController.prototype, "getCrawlerInfo", null);
    getCrawlerDataController = __decorate([
        decorator_1.controller("/api")
    ], getCrawlerDataController);
    return getCrawlerDataController;
}());
exports.getCrawlerDataController = getCrawlerDataController;
