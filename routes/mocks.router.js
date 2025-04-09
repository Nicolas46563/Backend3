const express = require('express');
const router = express.Router();
const userDAO = require('../dao/daos/user.dao');
const petDAO = require('../dao/daos/pet.dao');
const { generateUsers, generatePets } = require('../utils/mocking.utils');

// 🔹 Endpoint migrado desde desafío anterior
router.get('/mockingpets', (req, res) => {
  const pets = [];

  for (let i = 0; i < 100; i++) {
    pets.push({
      name: `Pet${i}`,
      species: i % 2 === 0 ? 'Perro' : 'Gato',
      age: Math.floor(Math.random() * 15) + 1
    });
  }

  res.json({ pets });
});

// 🔹 Nuevo endpoint: generar 50 usuarios fake con faker + bcrypt
router.get('/mockingusers', (req, res) => {
  const users = generateUsers(50);
  res.json({ users });
});

router.post('/generateData', async (req, res) => {
  const { users = 0, pets = 0 } = req.body;

  try {
    const fakeUsers = generateUsers(users);
    const fakePets = generatePets(pets);

    await userDAO.createMany(fakeUsers);
    await petDAO.createMany(fakePets);

    res.json({
      message: 'Datos generados e insertados correctamente',
      inserted: {
        users: fakeUsers.length,
        pets: fakePets.length
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al insertar datos en MongoDB', details: err.message });
  }
});

module.exports = router;
