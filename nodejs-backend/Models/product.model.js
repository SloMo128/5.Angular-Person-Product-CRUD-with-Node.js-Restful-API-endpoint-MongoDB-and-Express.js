const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  company: String,
  person: { type: mongoose.Schema.Types.ObjectId, ref: 'persons2' },
});

module.exports = mongoose.model('products2', ProductSchema);
