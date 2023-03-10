const mysql = require("mysql2/promise");
const { faker } = require("@faker-js/faker");

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

  const bigs = [
    "36028797018963970", // 2^55
    "288230376151711740", // 2^58
    "1152921504606847000", // 2^60
    "1152921504606847", // 2^60
    "18446744073709500",
    "18446744073709552000",
  ];
  const kinds = ["marvel", "dc"];

  for (let i = 0; i < 5000; i += 1) {
    const p1 = faker.random.numeric(3);
    const p2 = p1.toString().padStart(3, "0");
    // console.log(p2, `${bigs[3]}${p2}`);

    await conn.query(insertData, [
      `${bigs[3]}${p2}`,
      kinds[faker.random.numeric(10) % 2],
      faker.name.fullName(),
    ]);
  }

  await conn.query(insertData, [
    `0`,
    kinds[faker.random.numeric(10) % 2],
    faker.name.fullName(),
  ]);

  conn.end();
};

handler().catch((err) => {
  console.error(err.message);
  console.error(err.stack);
});
