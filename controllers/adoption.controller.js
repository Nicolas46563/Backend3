import Adoption from '../models/Adoption.js';

export const getAllAdoptions = async (req, res) => {
  const adoptions = await Adoption.find();
  res.json(adoptions);
};

export const createAdoption = async (req, res) => {
  const { user, pet } = req.body;
  const newAdoption = await Adoption.create({ user, pet });
  res.status(201).json(newAdoption);
};

export const deleteAdoption = async (req, res) => {
  const { id } = req.params;
  await Adoption.findByIdAndDelete(id);
  res.json({ message: 'Adopción eliminada' });
};
