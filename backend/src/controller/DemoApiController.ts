import { APIControllerInterface } from "./../utils/interfaces/APIControllerInterface";
export class DemoApiController implements APIControllerInterface {
  index(req: any, res: any): object {
    return ["hola"];
  }
  show(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  store(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  update(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  delete(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
}
