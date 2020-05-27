import express from "express";
import { Model } from "./../utils/Model";

export class Routes {
  constructor() {
    let app = express();
    app.get("/", (req: any, res: any) => {
      res.send(["hello world"]);
      new Model().get();
    });
    app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }
}
