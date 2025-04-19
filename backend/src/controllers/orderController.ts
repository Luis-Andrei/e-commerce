import { Request, Response } from 'express';
import Order from '../models/Order';
import User from '../models/User';
import axios from 'axios';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { items, address, phone } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    // Calcular o total do pedido
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

    // Criar o pedido
    const order = new Order({
      user: user._id,
      items,
      total,
      address,
      phone,
      status: 'pending'
    });

    await order.save();

    // Enviar mensagem para o WhatsApp
    try {
      const message = `Novo pedido #${order._id}\n\nCliente: ${user.name}\nTelefone: ${phone}\n\nEndereço:\n${address.street}, ${address.number}\n${address.neighborhood}\n${address.city} - ${address.state}\nCEP: ${address.postalCode}\n\nItens:\n${items.map((item: any) => `${item.quantity}x ${item.name} - R$ ${item.price.toFixed(2)}`).join('\n')}\n\nTotal: R$ ${total.toFixed(2)}`;

      await axios.post('https://api.whatsapp.com/send', {
        phone: '5551995412640',
        message: message
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem do WhatsApp:', error);
    }

    res.status(201).json(order);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const orders = await Order.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate('items.product');

    res.json(orders);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const order = await Order.findOne({ _id: id, user: user._id })
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Pedido não encontrado' });
    }

    res.json(order);
  } catch (error) {
    console.error('Erro ao buscar pedido:', error);
    res.status(500).json({ message: 'Erro ao buscar pedido' });
  }
}; 