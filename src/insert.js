const mysql = require("mysql2/promise");

const insertData = `INSERT INTO super_hero (\`property\`, \`kind\`, \`name\`) VALUES (?, ?, ?)`;

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
  const r1 = await conn.query(insertData, [
    "36028797018963970",
    "marvel",
    "ironman",
  ]);
  const r2 = await conn.query(insertData, [
    "288230376151711740",
    "marvel",
    "black panther",
  ]);

  console.log(r1);
  console.log(r2);

  conn.end();
};

handler().catch((err) => {
  console.error(err.message);
  console.error(err.stack);
});
