import { UserModel } from "./../models/UserModel";
export class UserResource {
  async getByToken(token: string) {
    let model = new UserModel();
    return (await model.where({ jwtToken: token }).get())[0];
  }
}
