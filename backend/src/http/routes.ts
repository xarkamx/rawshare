import express from "express";
import { Demo } from "./../models/DemoModel";

export class Routes {
  constructor() {
    let app = express();
    app.get("/", (req: any, res: any) => {
      new Demo().where({ id: 105 }).delete();
      new Demo().get().then((data) => {
        res.send(data);
      });
      new Demo()
        .where({ content: 10 })
        .setValues({
          content: 15,
          content2: "juanito",
        })
        .save();
    });
    app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }
}
