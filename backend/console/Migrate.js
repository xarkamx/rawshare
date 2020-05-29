let migration = require("../src/migrations/db.json");
var mysql = require("mysql");
require("dotenv").config();
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

migrate(migration);
function createTable(tableName, columns) {
  let tableColumns = formatColumns(columns);
  let query = `CREATE TABLE ${tableName} (${tableColumns}) ENGINE = MyISAM;`;
}
function formatColumns(columns) {
  let columnsQuery = [];
  let DBIndex = [];
  for (let name in columns) {
    let {
      type,
      autoincrement,
      length,
      defaultValue,
      nullable,
      index,
    } = columns[name];

    defaultValue = defaultValue ? `DEFAULT '${defaultValue}' ` : "";
    length = length ? `(${length})` : "";

    columnsQuery.push(`${name} ${type}  ${
      nullable ? "NULL" : "NOT NULL"
    } ${defaultValue} ${autoincrement ? "AUTO_INCREMENT" : ""}
    `);
    if (index) {
      DBIndex.push(`${index} (${name})`);
    }
  }
  return [...columnsQuery, ...DBIndex].join(" , ");
}
async function migrate(migrations) {
  let tables = await getTables();
  for (let index in migrations) {
    let migration = migrations[index];
    let found = tables.find((table) => table == index);
    if (!found) {
      createTable(index, migration);
    } else {
      // update table query
    }
  }
  var b = new Set(Object.keys(migrations));
  let difference = [...tables].filter((x) => !b.has(x));
  // delete diferences query
}
async function getTables() {
  return (await runQuery("show tables")).map((item) => Object.values(item)[0]);
}
function runQuery($query) {
  return new Promise((load, fail) => {
    connection.query($query, function (err, result) {
      if (err) fail(err);
      load(result);
    });
  });
}
