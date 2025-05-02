import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateUsers = (count = 50) => {
  const users = [];
  const hashedPassword = bcrypt.hashSync('coder123', 10);

  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
      password: hashedPassword,
      role: faker.helpers.arrayElement(['user', 'admin']),
      pets: []
    });
  }

  return users;
};

export const generatePets = (count = 50) => {
  const pets = [];

  for (let i = 0; i < count; i++) {
    pets.push({
      name: faker.animal.name(),
      species: faker.helpers.arrayElement(['Perro', 'Gato', 'Hamster', 'Tortuga']),
      age: faker.number.int({ min: 1, max: 15 })
    });
  }

  return pets;
};
