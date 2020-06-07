import { APIControllerInterface } from "../interfaces/APIControllerInterface";
import { UserModel } from "./../../models/UserModel";
import { encrypt, compare } from "./../../utils/Encriptor";
import * as keys from "../../assets/storage/keys.json";
import { isObjectEmpty } from "./../../core/helpers";
let jwt = require("jsonwebtoken");
export class UsersController implements APIControllerInterface {
  index(req: any, res: any): Promise<any> {
    let body = req.query;
    let model = new UserModel();
    if (isObjectEmpty(body)) {
      return model.get();
    }
    return model.where(body).get();
  }
  show(req: any, res: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async store(req: any, res: any): Promise<any> {
    let model = new UserModel();
    let body = req.body;
    console.log(req.query, req.body);
    body.password = await encrypt(body.password);
    model.setValues(body).save();
    return model.latest();
  }
  update(req: any, res: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  delete(req: any, res: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
  async auth(req: any) {
    let body = req.body;
    let userData = new UserModel();
    let content = await userData
      .select(["username", "password"])
      .where({ username: body.username })
      .orWhere({ email: body.email })
      .get();
    let { username, password } = content[0];
    let valid = await compare(body.password, password);
    if (!valid) {
      return { error: "Passwords dont match" };
    }
    let expiresIn = 1440 * 60;
    let token = jwt.sign({ check: content[0] }, username, {
      expiresIn,
    });
    userData.setValues({ jwtToken: token }).save();
    return { username, token, expiresIn };
  }
}
