import mongoose from  'mongoose'

const reviewSchema = new mongoose.Schema({
  userName: { type: String, default:'anonimous' },
  eventId: { type: mongoose.Schema.Types.ObjectId, required: true },
  rating: { type: String, required: true },
  comment:String ,
  timestamp: { type: Date, default: Date.now },
});

const Rating = mongoose.model('reviews', reviewSchema);

export default Rating;
