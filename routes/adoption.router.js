import express from 'express';
const router = express.Router();
import {
    getAllAdoptions,
    createAdoption,
    deleteAdoption
  } from '../controllers/adoption.controller.js';

router.get('/', getAllAdoptions);
router.post('/', createAdoption);
router.delete('/:id', deleteAdoption);

export default router;
