import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// Rotas públicas
router.get('/', getProducts);
router.get('/:id', getProductById);

// Rotas protegidas (requerem autenticação)
router.post('/', authenticate, createProduct);
router.put('/:id', authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router; 