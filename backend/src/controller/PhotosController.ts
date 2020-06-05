import { APIControllerInterface } from "./interfaces/APIControllerInterface";

export class PhotosController implements APIControllerInterface {
  index(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  show(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  store(req: any, res: any): object {
    console.log(req.files, req.file, req.body);
    return {};
  }
  update(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  delete(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
}
