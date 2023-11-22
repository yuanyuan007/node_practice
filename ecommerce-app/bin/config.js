// config.js

const DATABASE_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: 'muyuan635410125',
  database: 'node_practice',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const TABLES = [
  {
    name: 'users',
    createTableSQL: `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `,
    initialDataSQL: [
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', 'adminpassword');`,
      `INSERT INTO users (username, email, password) VALUES ('admin1', '635410125@qq.com', '111111');`
    ],


  },
];

// 连接池
const poolForPractive = {
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'muyuan635410125',
  database: 'node_practice',
}


module.exports = {
  DATABASE_CONFIG,
  TABLES,
  poolForPractive
};
