const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddelWare } = require('../../middleware/authMiddelware');

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddelWare, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getDetailsProduct);
router.delete('/delete/:id', authMiddelWare, ProductController.deleteProduct);
router.get('/get-all', ProductController.getAllProduct);
router.delete('/delete/:id', authMiddelWare, ProductController.deleteProduct);
router.post('/delete-many', authMiddelWare, ProductController.deleteMany);


module.exports = router;
