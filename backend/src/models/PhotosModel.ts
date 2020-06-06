import { Model } from "./../utils/Model";
export class PhotosModel extends Model {
  tableName = "cr2_paths";
  columns: Array<string> = ["id", "userID", "originalFile", "jpg"];
  constructor() {
    super();
  }
}
