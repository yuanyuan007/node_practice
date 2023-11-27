const crypto = require('crypto');

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
    initialDataSQL: setDefaultUserData().concat([
      `INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', 'adminpassword');`,
      `INSERT INTO users (username, email, password) VALUES ('admin1', '635410125@qq.com', '111111');`
    ]),
  },
];


function setDefaultUserData() {
  let insertArray = [];

  let randomName = '';
  let randomEmail = '';
  let password = '';

  for (let i = 1; i < 200; i++) {
    randomName = generateChineseName();
    randomEmail = generateRandomEmail();
    password = generateAndEncryptNumber();
    insertArray.push(`INSERT INTO users (username, email, password) VALUES ('${randomName}', '${randomEmail}', '${password}')`)
  }

  return insertArray;
}

function generateChineseName() {
  // 常见的姓氏列表
  const lastNames = [
    '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
    '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
  ];

  // 常见的名字列表
  const firstNames = [
    '伟', '芳', '娜', '秀英', '敏', '静', '强', '磊', '军', '洋',
    '梅', '艳', '娟', '玲', '勇', '杰', '涛', '明', '超', '红',
  ];

  // 随机选择一个姓氏和一个名字组合成中文名
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];

  // 返回生成的中文名
  return randomLastName + randomFirstName;
}


function generateRandomEmail() {
  // 常见的邮箱域名列表
  const emailDomains = [
    'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'qq.com',
    '163.com', 'sina.com', 'aliyun.com', 'icloud.com', 'live.com',
    // ... 其他邮箱域名
  ];
  // 生成一个随机的用户名部分
  const randomUsername = Math.random().toString(36).substring(2, 10);
  // 随机选择一个邮箱域名
  const randomDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
  // 返回生成的邮箱地址
  return `${randomUsername}@${randomDomain}`;
}


function generateAndEncryptNumber() {
  // 生成一个包含12位数字的随机字符串
  const randomString = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');

  // 使用 crypto 模块进行加密
  const secretKey = 'your_secret_key'; // 用于加密的秘钥，请替换为实际的秘钥
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);

  // 更新并加密数据
  let encryptedString = cipher.update(randomString, 'utf-8', 'hex');
  encryptedString += cipher.final('hex');

  // 返回加密后的字符串
  return encryptedString;
}





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
