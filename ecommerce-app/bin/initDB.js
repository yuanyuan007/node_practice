const mysql = require('mysql2/promise');
const { DATABASE_CONFIG, TABLES } = require('./config');

async function initDatabase() {
  const connection = await mysql.createConnection(DATABASE_CONFIG);
  try {
    // 创建表
    for (const table of TABLES) {
      await connection.execute(table.createTableSQL);
    }

    // 插入初始数据
    for (const initData of TABLES) {
      for (const insertSQL of initData.initialDataSQL) {
        await connection.execute(insertSQL);

      }

    }

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}


initDatabase();