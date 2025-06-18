import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String, // path to product image
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model('Product', productSchema);
