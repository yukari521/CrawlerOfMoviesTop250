"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var Analyzer = /** @class */ (function () {
    function Analyzer() {
    }
    Analyzer.get = function () {
        if (!Analyzer.instance) {
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance;
    };
    Analyzer.prototype.crawlInfo = function (html) {
        var $ = cheerio_1.default.load(html);
        var infoItems = $(".grid_view .item");
        var infoList = [];
        infoItems.map(function (index, element) {
            var sort = $(element).find(".pic em").text();
            var name = $(element).find(".info .hd a .title").eq(0).text();
            var url = $(element).find(".pic a").attr("href");
            var poster = $(element).find(".pic a img").attr("src");
            var score = $(element).find(".info .bd .star .rating_num").text();
            // const director = bd.split("\n")[0].split("   ")[0].split(":")[1].replace(/^\s+/, "").replace(/\s+$/, "");
            // const performer = bd.split("\n")[0].split("   ")[1].replace(/^\s+/, "").replace(/\s+$/, "").split(": ")[1].split(" /")[0];
            // const tags = bd.split("\n")[1].split("/")[2].replace(/^\s+/, "").replace(/\s+$/, "");
            // const year = bd.split("\n")[1].split("/")[0].replace(/^\s+/, "").replace(/\s+$/, "");
            // const country = bd.split("\n")[1].split("/")[1].replace(/^\s+/, "").replace(/\s+$/, "");
            var quote = $(element).find(".info .bd .quote .inq").text() || "";
            infoList.push({
                sort: sort,
                name: name,
                url: url,
                poster: poster,
                score: score,
                quote: quote,
            });
        });
        return infoList;
    };
    Analyzer.prototype.generateJsonData = function (content, filePath) {
        var fileContent = [];
        // if (fs.existsSync(filePath)) {
        //   const existFile: Content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        //   let arr = Array.from(new Set([...existFile.moviesList, ...content]));
        //   arr.sort();
        //   fileContent.moviesList = arr;
        // } else {
        fileContent = content;
        // }
        return fileContent;
    };
    Analyzer.prototype.analyze = function (html, filePath) {
        var result = this.crawlInfo(html);
        var fileContent = this.generateJsonData(result, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyzer;
}());
exports.default = Analyzer;
