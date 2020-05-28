import express from "express";
import { Demo } from "./../models/DemoModel";

export class Routes {
  constructor() {
    let app = express();
    app.get("/", (req: any, res: any) => {
      new Demo().get().then((data) => {
        res.send(data);
      });
    });
    app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }
}
