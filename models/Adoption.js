import mongoose from 'mongoose';
const adoptionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  pet: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Adoption = mongoose.model('Adoption', adoptionSchema);
export default Adoption;