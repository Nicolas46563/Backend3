import Pet from '../../models/Pet.js';

class PetDAO {
  async createMany(pets) {
    return await Pet.insertMany(pets);
  }
}

export default PetDAO;