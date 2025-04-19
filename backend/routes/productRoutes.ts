import { Router, Request, Response } from 'express';
import Product from '../models/Product';

const router = Router();

// GET /api/products - Listar todos os produtos
router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});

// POST /api/products - Criar um novo produto
router.post('/', async (req: Request, res: Response) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar produto' });
    }
});

export default router; 