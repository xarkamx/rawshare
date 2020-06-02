import { Model } from "./../utils/Model";
export class UserModel extends Model {
  tableName = "users";
  columns = ["id", "username", "email", "password"];
  constructor() {
    super();
  }
}
