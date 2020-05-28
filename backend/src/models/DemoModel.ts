import { Model } from "./../utils/Model";
export class Demo extends Model {
  tableName: string = "wp_posts";
  columns: Array<string> = ["id", "post_title", "post_type"];
  constructor() {
    super();
  }
}
