import express from "express";
import { DemoApiController } from "./../controller/DemoApiController";
import { APIControllerInterface } from "../controller/interfaces/APIControllerInterface";
import { UsersController } from "./../controller/users/UsersController";

export class Routes {
  app = express();
  constructor() {
    this.app.use(express.json());
    this.app.get("/", (req: any, res: any) => {});
    this.app.post("/api/auth", async (req: any, res: any) => {
      res.send(await new UsersController().auth(req));
    });
    this.API("/demo", new DemoApiController());
    this.API("/users", new UsersController());
    this.runServer();
  }
  private runServer() {
    this.app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }

  API(path: string, apiController: APIControllerInterface) {
    path = "/api" + path;
    this.app.get(`${path}`, async (req, res) => {
      res.send(apiController.index(req, res));
    });
    this.app.get(`${path}/:id`, async (req, res) => {
      res.send(apiController.show(req, res));
    });
    this.app.post(`${path}`, async (req, res) => {
      res.send(await apiController.store(req, res));
    });
    this.app.put(`${path}/:id`, async (req, res) => {
      res.send(apiController.update(req, res));
    });
    this.app.delete(`${path}/:id`, async (req, res) => {
      res.send(apiController.delete(req, res));
    });
  }
}
