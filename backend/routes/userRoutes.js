const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.post('/auth/login', userController.loginUser);
router.post('/auth/register', userController.createUser);
router.get('/users/:id_user/points', userController.getPoinUser);
router.get('/users/points/total', userController.getTotalPoin);
module.exports = router;
