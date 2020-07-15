import express from "express";
import router from "./route/router";
import "./controller/getCrawlerDataController";

const app = express();
const port: number = 8001;

app.use(router);

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
