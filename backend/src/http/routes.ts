import express from "express";
import { DemoApiController } from "./../controller/DemoApiController";
import { APIControllerInterface } from "./../utils/interfaces/APIControllerInterface";

export class Routes {
  app = express();
  constructor() {
    this.app.get("/", (req: any, res: any) => {});
    this.API("/demo", new DemoApiController());
    this.runServer();
  }
  private runServer() {
    this.app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }

  API(path: string, apiController: APIControllerInterface) {
    this.app.get(`${path}`, (req, res) => {
      res.send(apiController.index(req, res));
    });
    this.app.get(`${path}/:id`, (req, res) => {
      res.send(apiController.show(req, res));
    });
    this.app.post(`${path}`, (req, res) => {
      res.send(apiController.store(req, res));
    });
    this.app.put(`${path}/:id`, (req, res) => {
      res.send(apiController.update(req, res));
    });
    this.app.delete(`${path}/:id`, (req, res) => {
      res.send(apiController.delete(req, res));
    });
  }
}
