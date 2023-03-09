// create database if not exists biginttest;

const mysql = require("mysql2/promise");

const createTable = `
CREATE TABLE IF NOT EXISTS \`super_hero\` (
  \`id\` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  \`property\` bigint(20) NOT NULL,
  \`name\` varchar(200) NOT NULL,
  primary key (\`id\`),
  key \`idx_id_property\` (\`id\`, \`property\`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
`;

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
  const result = await conn.query(createTable);
  console.log(result);

  conn.end();
};

handler().catch((err) => {
  console.error(err.message);
  console.error(err.stack);
});
