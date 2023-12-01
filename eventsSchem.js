import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  describe: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  free: { type: Boolean, default: false },
  places: { type: Number, required: true },
  persons: { type: Array, default: [] },
  pic: { type: String, required: true },
  date:{type:Date,require:true},
  minAge:Number,
  latitude:String,
longtude:String
});

const AllEvents = mongoose.model('events', eventSchema);

export default AllEvents;

