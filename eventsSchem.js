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
  minAge:{type:Number,require:true},
  rating:[{
    userName: { type: String, default:'anonimous' },
    eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
    rating: { type: String, required: true },
    comment:String ,
    timestamp: { type: Date, default: Date.now },
  }],
  latitude:String,
longtude:String
});

const AllEvents = mongoose.model('events', eventSchema);

export default AllEvents;

