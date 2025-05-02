import express from 'express';
import {
    getAllProducts,
    createProduct,
    bulkCreateProducts,
    updateProduct,
    deleteProduct
} from '../controllers/products.controller.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', getAllProducts);

// Crear un nuevo producto
router.post('/', createProduct);

// Crear productos en masa
router.post('/bulk', bulkCreateProducts);

// Actualizar un producto por ID
router.put('/:id', updateProduct);

// Eliminar un producto por ID
router.delete('/:id', deleteProduct);

export default router;


/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtener productos
 *     description: Devuelve una lista de productos con opciones de filtro, paginación y ordenamiento.
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número de productos por página.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página actual.
 *     responses:
 *       200:
 *         description: Lista de productos.
 *       500:
 *         description: Error al obtener los productos.
 */
