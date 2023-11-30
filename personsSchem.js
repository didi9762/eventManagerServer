import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  events: { type: Array, default: [] },
  age: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Allpersons = mongoose.model('Persons', personSchema);

export default Allpersons;
