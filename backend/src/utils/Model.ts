var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "wordpress",
});

connection.connect(function (err: any) {
  if (err) throw err;
});

export class Model {
  columns: Array<string> = [];
  tableName: string = "";
  select(columns: Array<string>) {}
  where(args: Array<object>) {}
  orWhere(args: Array<object>) {}
  get() {
    connection.query("select * from wp_config", function (
      err: any,
      result: any
    ) {
      if (err) throw err;
      console.log(result, err, "no manda nada");
    });
  }
  save() {}
}
