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
exports.getOrderById = exports.getOrders = exports.createOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const axios_1 = __importDefault(require("axios"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { items, address, phone } = req.body;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        // Calcular o total do pedido
        const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        // Criar o pedido
        const order = new Order_1.default({
            user: user._id,
            items,
            total,
            address,
            phone,
            status: 'pending'
        });
        yield order.save();
        // Enviar mensagem para o WhatsApp
        try {
            const message = `Novo pedido #${order._id}\n\nCliente: ${user.name}\nTelefone: ${phone}\n\nEndereço:\n${address.street}, ${address.number}\n${address.neighborhood}\n${address.city} - ${address.state}\nCEP: ${address.postalCode}\n\nItens:\n${items.map((item) => `${item.quantity}x ${item.name} - R$ ${item.price.toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;
            yield axios_1.default.post('https://api.whatsapp.com/send', {
                phone: '5551995412640',
                message: message
            });
        }
        catch (error) {
            console.error('Erro ao enviar mensagem do WhatsApp:', error);
        }
        res.status(201).json(order);
    }
    catch (error) {
        console.error('Erro ao criar pedido:', error);
        res.status(500).json({ message: 'Erro ao criar pedido' });
    }
});
exports.createOrder = createOrder;
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const orders = yield Order_1.default.find({ user: user._id })
            .sort({ createdAt: -1 })
            .populate('items.product');
        res.json(orders);
    }
    catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ message: 'Erro ao buscar pedidos' });
    }
});
exports.getOrders = getOrders;
const getOrderById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = req.user;
        if (!user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }
        const order = yield Order_1.default.findOne({ _id: id, user: user._id })
            .populate('items.product');
        if (!order) {
            return res.status(404).json({ message: 'Pedido não encontrado' });
        }
        res.json(order);
    }
    catch (error) {
        console.error('Erro ao buscar pedido:', error);
        res.status(500).json({ message: 'Erro ao buscar pedido' });
    }
});
exports.getOrderById = getOrderById;
