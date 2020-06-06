import { APIControllerInterface } from "./interfaces/APIControllerInterface";
import { PhotosModel } from "./../models/PhotosModel";
import { UserResource } from "./../resources/UserResource";
import { parse } from "path";
export class PhotosController implements APIControllerInterface {
  index(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  show(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  async store(req: any, res: any) {
    const token = req.headers["access-token"];
    let jpg = "";
    let model = new PhotosModel();
    let userID = (await new UserResource().getByToken(token)).id;
    let { filename } = req.body;
    if (parse(filename).ext == ".jpg") jpg = filename;
    model
      .setValues({
        userID,
        originalFile: filename,
        jpg,
      })
      .save();
    return model.latest();
  }
  update(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
  delete(req: any, res: any): object {
    throw new Error("Method not implemented.");
  }
}
