const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  database: "surveyproject",
  user: "root",
});
module.exports = pool;
