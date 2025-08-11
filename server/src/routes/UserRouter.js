const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authMiddelWare, } = require('../../middleware/authMiddelware');

router.post('/sign-up', userController.createUser);
router.post('/sign-in', userController.loginUser);
router.post('/log-out', userController.logoutUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', authMiddelWare, userController.deleteUser);
router.get('/getAll', authMiddelWare, userController.getAllUser);
router.get('/get-details/:id', userController.getDetailsUser);
router.post('/refresh-token', userController.refreshToken);
router.post('/delete-many', authMiddelWare, userController.deleteMany);

module.exports = router;
