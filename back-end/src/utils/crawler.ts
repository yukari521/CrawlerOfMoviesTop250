import superagent from "superagent";
import fs from "fs";
import path from "path";
import { Analyzer } from "../interface/interface";

export default class Crawler {
  private filePath = path.resolve(__dirname, "../../data/crawlerData.json");

  private async getRawHtml() {
    const result = await superagent.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
  private async initCrawlerProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  constructor(private url: string, private analyzer: Analyzer) {
    this.initCrawlerProcess();
  }
}
