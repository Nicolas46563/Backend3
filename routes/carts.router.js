import express from 'express';
import {
    createCart,
    getCartById,
    addProductToCart,
    removeProductFromCart,
    confirmCart,
    addMultipleProductsToCart,
    getConfirmedCarts
} from '../controllers/carts.controller.js';

import cartDAO from '../dao/daos/cart.dao.js';
import productDAO from '../dao/daos/product.dao.js';
import ticketDAO from '../dao/daos/ticket.dao.js';
import TicketDTO from '../dao/dtos/ticket.dto.js';

const router = express.Router();

// 🔹 Crear un nuevo carrito
router.post('/', createCart);

// 🔹 Agregar productos en masa al carrito
router.post('/:id/products/bulk', addMultipleProductsToCart);

// 🔹 Agregar un producto individual al carrito
router.post('/:id/products', addProductToCart);

// 🔹 Eliminar un producto del carrito
router.delete('/:id/products/:productId', removeProductFromCart);

// 🔹 Confirmar un carrito
router.post('/:id/confirm', confirmCart);

// 🔹 Ruta para obtener los últimos carritos confirmados
router.get('/confirmed', getConfirmedCarts);

// 🔹 Obtener un carrito por ID
router.get('/:id', getCartById);

// 🔹 Finalizar compra de un carrito
router.post('/:cid/purchase', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartDAO.getById(cartId);

    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    let totalAmount = 0;
    let productsToPurchase = [];
    let productsNotProcessed = [];

    for (let item of cart.products) {
      const product = await productDAO.getById(item.product._id);

      if (product && product.stock >= item.quantity) {
        // 🔹 Restar stock y agregar a la compra
        await productDAO.update(product._id, { stock: product.stock - item.quantity });

        totalAmount += product.price * item.quantity;
        productsToPurchase.push({ id: product._id, title: product.title, quantity: item.quantity });
      } else {
        // 🔹 No hay suficiente stock, dejar en el carrito
        productsNotProcessed.push({
          id: product._id,
          title: product.title,
          requested: item.quantity,
          available: product ? product.stock : 0
        });
      }
    }

    if (productsToPurchase.length === 0) {
      return res.status(400).json({
        message: 'No se pudo procesar la compra, sin stock disponible.',
        notProcessed: productsNotProcessed
      });
    }

    // 🔹 Crear ticket de compra
    const userEmail = req.user ? req.user.email : 'desconocido@example.com';
    const ticketData = {
      amount: totalAmount,
      purchaser: userEmail
    };

    const newTicket = await ticketDAO.create(ticketData);
    if (!newTicket) {
      return res.status(500).json({ message: 'Error al generar el ticket.' });
    }
    
    const ticketDTO = new TicketDTO(newTicket);

    // 🔹 Filtrar el carrito y mantener solo los productos no procesados
    cart.products = cart.products.filter(item =>
      productsNotProcessed.find(p => p.id === item.product._id)
    );
    await cartDAO.update(cartId, { products: cart.products });

    return res.status(200).json({
      message: productsNotProcessed.length === 0 ? 'Compra realizada con éxito' : 'Compra realizada parcialmente',
      ticket: ticketDTO,
      notProcessed: productsNotProcessed
    });

  } catch (error) {
    console.error('Error en la compra:', error);
    return res.status(500).json({ message: 'Error en la compra', error });
  }
});

export default router;
