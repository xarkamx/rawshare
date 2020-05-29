import { Model } from "./../utils/Model";
export class Demo extends Model {
  tableName: string = "example";
  columns: Array<string> = ["id", "content", "content2"];
  constructor() {
    super();
  }
}
