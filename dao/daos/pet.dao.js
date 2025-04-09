const Pet = require('../../models/Pet');

class PetDAO {
  async createMany(pets) {
    return await Pet.insertMany(pets);
  }
}

module.exports = new PetDAO();
