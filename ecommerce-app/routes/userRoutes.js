// userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// 路由路径：/users
router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);

// 路由路径：/users/:id
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);
module.exports = router;
