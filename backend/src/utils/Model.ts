var mysql = require("mysql");

require("dotenv").config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err: any) {
  if (err) throw err;
});

export class Model {
  columns: Array<string> = [];
  tableName: string = "";
  type: string = "insert";
  query: string = "";
  whereQuery: Array<string> = [];
  selectedColumns: string = "*";
  /**
   * Setea las columnas a obtener
   * @param columns
   * @returns Model
   */
  select(columns: Array<string>): Model {
    this.selectedColumns = columns.length == 0 ? "*" : columns.join(",");
    return this;
  }
  where(args: Array<object>) {}
  orWhere(args: Array<object>) {}
  /**
   * Ejecuta la query generada hasta el momento
   * @returns Promise;
   */
  get(): Promise<any> {
    if (this.selectedColumns == "*") {
      this.select(this.columns);
    }
    return this.runQuery(
      `select ${this.selectedColumns} from ${this.tableName}`
    );
  }
  getColumns() {}
  getTables() {}
  runQuery($query: string) {
    console.log($query);
    return new Promise((load, fail) => {
      connection.query($query, function (err: any, result: any) {
        if (err) fail(err);
        load(result);
      });
    });
  }
  save() {
    if (this.type == "insert") {
    }
  }
}
