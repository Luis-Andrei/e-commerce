"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('Buscando produtos...');
        const products = yield Product_1.default.find();
        console.log(`Encontrados ${products.length} produtos`);
        res.json(products);
    }
    catch (error) {
        console.error('Erro ao buscar produtos:', error);
        res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar produto' });
    }
});
exports.getProductById = getProductById;
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new Product_1.default(req.body);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao criar produto' });
    }
});
exports.createProduct = createProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar produto' });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
        }
        res.json({ message: 'Produto excluído com sucesso' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao excluir produto' });
    }
});
exports.deleteProduct = deleteProduct;
