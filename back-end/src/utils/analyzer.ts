import cheerio from "cheerio";
import fs from "fs";
import { Movies } from "../interface/interface";

export default class Analyzer {
  private static instance: Analyzer;
  static get() {
    if (!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }
  private crawlInfo(html: string) {
    const $ = cheerio.load(html);
    const infoItems = $(".grid_view .item");
    const infoList: Movies[] = [];
    infoItems.map((index, element) => {
      const sort = $(element).find(".pic em").text();
      const name = $(element).find(".info .hd a .title").eq(0).text();
      const url = $(element).find(".pic a").attr("href")
      const poster = $(element).find(".pic a img").attr("src");
      const score = $(element).find(".info .bd .star .rating_num").text();
      // const director = bd.split("\n")[0].split("   ")[0].split(":")[1].replace(/^\s+/, "").replace(/\s+$/, "");
      // const performer = bd.split("\n")[0].split("   ")[1].replace(/^\s+/, "").replace(/\s+$/, "").split(": ")[1].split(" /")[0];
      // const tags = bd.split("\n")[1].split("/")[2].replace(/^\s+/, "").replace(/\s+$/, "");
      // const year = bd.split("\n")[1].split("/")[0].replace(/^\s+/, "").replace(/\s+$/, "");
      // const country = bd.split("\n")[1].split("/")[1].replace(/^\s+/, "").replace(/\s+$/, "");
      const quote = $(element).find(".info .bd .quote .inq").text() || "";
      infoList.push({
        sort,
        name,
        url,
        poster,
        score,
        quote,
      });
    });
    return infoList;
  }

  private generateJsonData(content: Movies[], filePath: string) {
    let fileContent = []
    // if (fs.existsSync(filePath)) {
    //   const existFile: Content = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    //   let arr = Array.from(new Set([...existFile.moviesList, ...content]));
    //   arr.sort();
    //   fileContent.moviesList = arr;
    // } else {
    fileContent = content;
    // }
    return fileContent;
  }

  public analyze(html: string, filePath: string) {
    const result = this.crawlInfo(html);
    const fileContent = this.generateJsonData(result, filePath);
    return JSON.stringify(fileContent);
  }
}
