const mysql = require('mysql2');
const util = require('util');

const { poolForPractive } = require('../bin/config');
const pool = mysql.createPool(poolForPractive);

const query = util.promisify(pool.query).bind(pool);

class UserModel {
  static async getUsers(pageNumber, pageSize) {
    try {

      // const users = await query('SELECT * FROM users');
      const offset = (pageNumber - 1) * (pageSize || 10);
      const users = await query(`SELECT * FROM users LIMIT ${pageSize || 10} OFFSET ${offset || 0}`);

      const total = await query(`SELECT COUNT(*) as total FROM users`);
      return {
        responseType: 1,
        responseTypeMessage: 'success',
        data: {
          list: users,
          total: total[0].total,
          pageNumber: pageNumber,
          pageSize: pageSize
        }

      };
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(userId) {
    try {
      const user = await query('SELECT * FROM users WHERE id = ?', [userId]);
      return user[0]; // 因为返回的是数组，我们取第一个元素
    } catch (error) {
      throw error;
    }
  }

  static async createUser(userData) {
    try {
      const result = await query('INSERT INTO users SET ?', [userData]);
      return result.insertId; // 返回新创建用户的 ID
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(userId, userData) {
    try {
      const result = await query('UPDATE users SET ? WHERE id = ?', [userData, userId]);
      return result.affectedRows > 0; // 如果影响的行数大于 0，表示更新成功
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(userId) {
    try {
      const result = await query('DELETE FROM users WHERE id = ?', [userId]);
      return result.affectedRows > 0; // 如果影响的行数大于 0，表示删除成功
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserModel;