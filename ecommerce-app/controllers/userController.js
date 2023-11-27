const UserModel = require('../models/userModel');
const { validationResult, body } = require('express-validator');
class UserController {
  static async getUsers(req, res) {

    /**
     * pageNumber 第几页
     * pageSize 每页多少条
     * **/
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    try {
      const users = await UserModel.getUsers(pageNumber, pageSize);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getUserById(req, res) {
    const userId = req.params.id;

    try {
      const user = await UserModel.getUserById(userId);

      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async createUser(req, res) {

    // 在这里定义验证规则
    const validationRules = [
      body('username').notEmpty().withMessage('用户名不能为空'),
      body('email').isEmail().withMessage('邮箱格式不正确').notEmpty().withMessage('邮箱不能为空'),
      body('password').isLength({ min: 6 }).withMessage('密码输入不能小于6个字符'),
    ];

    // 应用验证规则
    await Promise.all(validationRules.map(validationRule => validationRule.run(req)));

    // 获取验证结果
    const errors = validationResult(req);

    // 检查是否有验证错误
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: 400, errors: errors.array() });
    }

    const userData = req.body;

    try {
      const newUserId = await UserModel.createUser(userData);
      res.json({ userId: newUserId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateUser(req, res) {
    const userId = req.params.id;
    const userData = req.body;

    try {
      const success = await UserModel.updateUser(userId, userData);

      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      const success = await UserModel.deleteUser(userId);

      if (success) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}



module.exports = UserController;
