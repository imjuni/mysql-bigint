// create database if not exists biginttest;

const mysql = require("mysql2/promise");
const { raw } = require("mysql2");

const selectData = `SELECT * FROM super_hero WHERE kind = ? and property > ?`;

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
  const [r1, _fields] = await conn.query(selectData, [
    "marvel",
    raw("1152921504606847000"),
  ]);

  console.log(r1);

  conn.end();
};

handler().catch((err) => {
  console.error(err.message);
  console.error(err.stack);
});
