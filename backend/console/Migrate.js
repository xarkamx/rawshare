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

/**
 * Crea una nueva tabla con los parametros proporcionados
 * @param string tableName 
 * @param {"type",
      "autoincrement",
      "length",
      "defaultValue",
      "collation",
      "nullable"} columns 
 */
function createTable(tableName, columns) {
  let tableColumns = formatColumns(columns);
  let query = `CREATE TABLE ${tableName} (${tableColumns}) ENGINE = MyISAM;`;
  runQuery(query);
}

/**
 * Formatea las columnas de un objeto a una cadena compatible con mysql
 * @param {*} columns
 */
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
      unique,
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
    if (unique) {
      DBIndex.push(`${unique} (${name})`);
    }
  }
  return [...columnsQuery, ...DBIndex].join(" , ");
}

/**
 * Ejecuta por medio de un json la migracion para la estructura de la tabla
 * @param {*} migrations
 */
async function migrate(migrations) {
  let tables = await getTables();

  dropDeletedTables(migrations, tables);
  for (let index in migrations) {
    let migration = migrations[index];
    let found = tables.find((table) => table == index);
    if (!found) {
      createTable(index, migration);
    } else {
      updateTable(index, migration);
    }
  }
}

/**
 * Actualiza la tabla eliminando o creando columnas
 * @param string table
 * @param {*} migration
 */
async function updateTable(table, migration) {
  let columnsData = await runQuery(`describe ${table}`);
  let columnsNames = columnsData.map((item) => item.Field);
  getDiference(Object.keys(migration), columnsNames).map((column) => {
    dropColumn(table, column);
  });
  getDiference(columnsNames, Object.keys(migration)).map((column) =>
    addColumn(table, column, migration[column])
  );

  modifyColumn(table, migration);
}

/**
 * Elimina las tablas que ya no tienen su respectiva migracion
 * @param {*} migrations
 * @param [*] tables
 */
function dropDeletedTables(migrations, tables) {
  let difference = getDiference(Object.keys(migrations), tables);
  for (let table of difference) {
    runQuery(`drop table ${table}`);
  }
}
/**
 * Crea una nueva columna
 * @param string table
 * @param string column
 * @param {*} migration
 */
function addColumn(table, column, columnData) {
  return runQuery(`ALTER TABLE ${table}
    ADD ${column} ${columnData.type};`);
}
/**
 * Elimina una columna
 * @param string table
 * @param string column
 */
function dropColumn(table, column) {
  return runQuery(`ALTER TABLE ${table}
    DROP COLUMN ${column};`);
}
async function getTables() {
  return (await runQuery("show tables")).map((item) => Object.values(item)[0]);
}
function runQuery(query) {
  console.log(query);
  return new Promise((load, fail) => {
    connection.query(query, function (err, result) {
      if (err) fail(err);
      load(result);
    });
  });
}
function getDiference(arr1, arr2) {
  let b = new Set(arr1);
  return [...arr2].filter((x) => {
    return !b.has(x);
  });
}
function modifyColumn(table, columnData) {
  let querys = [];
  for (let key in columnData) {
    let { type, nullable, defaultValue, autoincrement, unique } = columnData[
      key
    ];
    defaultValue = defaultValue ? `DEFAULT '${defaultValue}' ` : "";
    let values = ` ${type}  ${nullable ? "NULL" : "NOT NULL"} ${defaultValue} ${
      autoincrement ? "AUTO_INCREMENT" : ""
    } `;
    runQuery(`ALTER TABLE ${table} MODIFY ${key} ${values}`);
    if (unique) {
      runQuery(`ALTER TABLE ${table} ADD UNIQUE (${key}) `);
    }
  }
}
