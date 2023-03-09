// create database if not exists biginttest;

const mysql = require("mysql2/promise");

const selectData = `SELECT * FROM super_hero WHERE property = ?`;

const handler = async () => {
  const conn = await mysql.createConnection({
    host: "localhost",
    port: 15000,
    user: "root",
    password: process.env.PW,
    database: "biginttest",
    supportBigNumbers: true,
    bigNumberStrings: true,
  });

  // create test table
  const [r1, _fields] = await conn.execute(selectData, ["36028797018963970"]);

  console.log(r1);

  conn.end();
};

handler().catch((err) => {
  console.error(err.message);
  console.error(err.stack);
});
