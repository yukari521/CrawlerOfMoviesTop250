import "reflect-metadata";
import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { controller, get } from "../decorator/";
import { getResponseData } from "../utils/utils";
import Analyzer from "../utils/analyzer";
import Crawler from "../utils/crawler";

@controller("/api")
export class getCrawlerDataController {
  @get("/getCrawlerInfo")
  getCrawlerInfo(req: Request, res: Response): void {
    const dataPath = path.resolve(__dirname, "../../data/crawlerData.json");
    const pages = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225];
    const startIndex = Number(req.query.page) - 1
    const startPage = pages[startIndex]
    let url = `https://movie.douban.com/top250?start=${startPage}&filter=`;
    let analyzer = Analyzer.get();
    new Crawler(url, analyzer);
    try {
      const result = JSON.parse(fs.readFileSync(dataPath, "utf-8"));

      res.json(getResponseData(result));
    } catch (error) {
      res.json(getResponseData([], true, "数据不存在！"));
    }
  }
}
