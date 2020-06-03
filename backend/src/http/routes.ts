import express from "express";
import { DemoApiController } from "./../controller/DemoApiController";
import { APIControllerInterface } from "../controller/interfaces/APIControllerInterface";
import { UsersController } from "./../controller/users/UsersController";
import { isArray } from "util";
import { validateToken } from "./middlewares/MiddlewareCollection";

export class Routes {
  app = express();
  constructor() {
    this.app.use(express.json());
    this.app.get("/", (req: any, res: any) => {
      res.send("hola");
    });
    this.app.post("/api/auth", async (req: any, res: any) => {
      res.send(await new UsersController().auth(req));
    });
    this.API("/demo", new DemoApiController());
    this.API("/users", new UsersController(), validateToken);
    this.runServer();
  }
  private runServer() {
    this.app.listen(3000, function () {
      console.log("Example app listening on port 3000!");
    });
  }

  API(
    path: string,
    apiController: APIControllerInterface,
    middleWare: any | Array<any> = null
  ) {
    path = "/api" + path;
    this.app.get(`${path}`, async (req, res) => {
      this._sender({ req, res, middleWare, callback: apiController.index });
    });
    this.app.get(`${path}/:id`, async (req, res) => {
      this._sender({ req, res, middleWare, callback: apiController.show });
    });
    this.app.post(`${path}`, async (req, res) => {
      this._sender({ req, res, middleWare, callback: apiController.store });
    });
    this.app.put(`${path}/:id`, async (req, res) => {
      this._sender({ req, res, middleWare, callback: apiController.update });
    });
    this.app.delete(`${path}/:id`, async (req, res) => {
      this._sender({ req, res, middleWare, callback: apiController.delete });
    });
  }

  private async __runMiddleware(
    middleWare: any | Array<any>,
    { req, res }: { req: any; res: any }
  ) {
    let proceed = true;
    if (isArray(middleWare)) {
      for (let method of middleWare) {
        let proceed = await method(req, res);
        if (proceed === false) {
          break;
        }
      }
    } else {
      proceed = await middleWare(req, res);
    }
    return proceed === true;
  }
  private async _sender({ req, res, middleWare, callback }: iSender) {
    let response = await this.__runMiddleware(middleWare, { req, res });
    if (response) {
      res.send(await callback(req, res));
    }
  }
}
interface iSender {
  req: any;
  res: any;
  middleWare: any;
  callback: any;
}
