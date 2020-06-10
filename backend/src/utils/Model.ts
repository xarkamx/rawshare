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
  query: string = "";
  whereQuery: Array<object> = [];
  values: any = {};
  selectedColumns: string = "*";
  order: string = "";
  limiter: string = "";

  /**
   * Setea las columnas a obtener
   * @param columns
   * @returns Model
   */
  select(columns: Array<string>): Model {
    this.selectedColumns = columns.length == 0 ? "*" : columns.join(",");
    return this;
  }
  /**
   * Prepara el objeto para una consulta where
   * @param args string || {key{val,operator}}
   */
  where(args: any) {
    let queryArr = this.queryGenerator(args);
    this.whereQuery.push({ and: queryArr.join(" and ") });
    return this;
  }

  /**
   * Prepara el objeto para una consulta where or
   * @param args string || {key{val,operator}}
   */
  orWhere(args: any) {
    let queryArr = this.queryGenerator(args);
    this.whereQuery.push({ or: queryArr.join(" or ") });
    return this;
  }

  private queryGenerator(args: any) {
    let queryArr = [];
    let operator = "=";
    for (let index in args) {
      let item = args[index];
      if (typeof item == "object") {
        operator = item.operator || "=";
        item = item.val;
      }
      let query = `${this.tableName}.${index} ${operator} "${item}"`;
      queryArr.push(query);
    }
    return queryArr;
  }

  /**
   * Ejecuta la query generada hasta el momento
   * @returns Promise;
   */
  get(): Promise<any> {
    if (this.selectedColumns == "*") {
      this.select(this.columns);
    }
    let where = this.__formatWhereQuery();
    return this.runQuery(
      `select ${this.selectedColumns} from ${this.tableName} ${where} ${this.order} ${this.limiter}`
    );
  }

  /**
   *
   * Elimina elementos seleccionados mediante el metodo where.
   * @returns Promise;
   */
  delete(): Promise<any> {
    let where = this.__formatWhereQuery();
    if (where == "") {
      throw "No te olvides de poner el where";
    }
    return this.runQuery(`delete  from ${this.tableName} ${where}`);
  }
  latest(): Promise<any> {
    if (this.selectedColumns == "*") {
      this.select(this.columns);
    }
    return this.runQuery(
      `select ${this.selectedColumns} from ${this.tableName} order by id desc limit 1 `
    );
  }

  /**
   * Formatea las querys de busqueda.
   * @returns string
   */
  __formatWhereQuery(): string {
    let querys = this.whereQuery;
    if (querys.length == 0) {
      return "";
    }
    let query = "where " + Object.values(this.whereQuery[0])[0];

    querys = querys.slice(1);
    for (let item of querys) {
      let type = Object.keys(item)[0];
      let values = Object.values(item)[0];
      query += ` ${type} ${values}`;
    }
    return query;
  }

  getColumns() {}
  runQuery($query: string) {
    return new Promise((load, fail) => {
      connection.query($query, function (err: any, result: any) {
        if (err) fail(err);
        load(result);
      });
    });
  }
  setValues(values: object) {
    this.values = values;
    return this;
  }
  /**
   * Guarda o actualiza la informacion definida en values en la base de datos
   * @return Model
   */
  save() {
    let query = "";
    let querys = this.whereQuery;
    let type = "insert";
    if (querys.length > 0) {
      type = "update";
    }
    switch (type) {
      case "insert":
        query = this._setInsertQuery();
        break;
      case "update":
        query = this._setUpdateQuery();
        break;
    }
    this.runQuery(query);
    return this;
  }
  /**
   * Ordenar por columna y direccion
   * @param column
   * @param direction
   */
  orderBy(column: string = "id", direction: string = "desc") {
    this.order = `order by ${column} ${direction}`;
    return this;
  }
  limit(from: string, to = "") {
    this.limiter = ` limit ${from} ${to}`;
    return this;
  }
  private _setInsertQuery(): string {
    let columns = Object.keys(this.values).join(",");
    let values = Object.values(this.values).join("','");
    let query = `insert into ${this.tableName} (${columns}) values ('${values}')`;
    return query;
  }
  private _setUpdateQuery() {
    let querys = [];
    for (let index in this.values) {
      let item = this.values[index];
      querys.push(`${index}='${item}'`);
    }
    return (
      `update ${this.tableName} set ` +
      querys.join(",") +
      this.__formatWhereQuery()
    );
  }
}
